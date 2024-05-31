// ==UserScript==
// @name         有道云链接提取器
// @namespace    https://github.com/yoophoon/youdaoNoteIMGlink
// @copyright    2024, yoophoon (https://github.com/yoophoon)
// @version      2024-04-07
// @description  获取有道云能用的链接
// @icon         https://note.youdao.com/favicon.ico
// @grant        unsafeWindow
// @grant        GM_addStyle
// @author       yoophoon
// @homepage     https://github.com/yoophoon
// @match        https://note.youdao.com/ynoteshare/*
// @run-at       document-end
// @license      MIT
// ==/UserScript==

/**
 * https://note.youdao.com/s/SX3bd0Qn //文件
 * https://note.youdao.com/s/1A2EF0ij //文件夹
 * https://note.youdao.com/yws/api/personal/file/${entryID}?method=download&shareKey=${shareKey}
 * 链接主要依赖两个参数 shareKey和 entryID
 * shareKey可以通过分享页面的URL获取
 * entryID可以通过https://note.youdao.com/yws/api/personal/share?method=get&shareKey=${shareKey}&unloginId=${unloginid}&sec=v1返回的json中的entry.id获取
 * 如果是文件夹则需要通过https://note.youdao.com/yws/public/notebook/${shareKey}/subdir/${entryID}?sec=v1返回文件夹子文件的entryID
 */

(function () {
    const unloginid = crypto.randomUUID();
    const searchParams = new URLSearchParams(window.location.search);
    const shareKey = searchParams.getAll('id')
    const fileIDURL = `https://note.youdao.com/yws/api/personal/share?method=get&shareKey=${shareKey}&unloginId=${unloginid}&sec=v1`

    console.log(fileIDURL)
    const res = fetch(fileIDURL)
    res.then(response => response.json())
        .then(json => {
            console.log(json)
            if (getShareType(json) == 'folder') {
                getShareContent(shareKey, json.entry.id).then(sc => console.log(sc))
            } else if (getShareType(json) == 'file') {
                let shareContent = [{
                    type: 'file',
                    Name: json.name,
                    entryID: json.entry.id,
                    link: `https://note.youdao.com/yws/api/personal/file/${json.entry.id}?method=download&shareKey=${shareKey}`
                }]
                console.log(shareContent)
            }
        })
}())

function getShareType(shareData) {
    if (shareData.hasOwnProperty('entry')) {
        if (shareData.entry.dir == true) return 'folder'
        if (shareData.entry.dir == false) return 'file'
    }
    if (shareData.hasOwnProperty('dr')) {
        if (shareData.dr == 1) return 'folder'
        if (shareData.dr == 0) return 'file'
    }
}

async function getShareContent(shareKey, entryID) {
    const subDirURL = `https://note.youdao.com/yws/public/notebook/${shareKey}/subdir/${entryID}?sec=v1`
    let shareContent = []
    await fetch(subDirURL).then(res => res.json())
        .then(res => {
            res[2].forEach(element => {
                const nextEntryID = element.p.split('/')
                if (getShareType(element) == 'file') {
                    shareContent.push({
                        type: 'file',
                        Name: element.tl,
                        entryID: nextEntryID[2],
                        link: `https://note.youdao.com/yws/api/personal/file/${nextEntryID[2]}?method=download&shareKey=${shareKey}`
                    })
                } else if (getShareType(element) == 'folder') {
                    getShareContent(shareKey, nextEntryID[1]).then(res => {
                        shareContent.push({
                            type: 'folder',
                            Name: element.tl,
                            entryID: nextEntryID[1],
                            folderItems: res
                        })
                    })
                }
            })
        })
    return Promise.resolve(shareContent)
}