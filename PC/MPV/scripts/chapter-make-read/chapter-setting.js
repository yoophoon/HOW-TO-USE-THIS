
var chapterList = new Array()

/**
 * @format millisecond
 */
function setChapter(list) {
    //这个读不到script-opts对应的conf文件
    //mp.options.read_options(chapterSettingOption)
    //获取当前时间 格式为毫秒
    var temp_pos = mp.get_property_number("time-pos/full")
    var markedChapter = temp_pos.toFixed(3) * 1000
    mp.osd_message('mark a chapter at' + markedChapter)
    list.push(markedChapter)
}

function writeChapterToFile(list) {
    list.sort(function (a, b) { return a - b })
    var chapterInfo = ""
    for (var tempIndex = 0; tempIndex < list.length; tempIndex++) {
        chapterInfo += 'chapter ' + tempIndex + ' : ' + list[tempIndex] + '\n'
    }
    //显示当前播放文件路径
    mp.osd_message(chapterInfo + mp.utils.getcwd() + '\\' + mp.get_property('filename'))
    mp.msg.info('2:' + mp.get_script_name())
}

mp.add_key_binding("Ctrl+c", "setChapter", function () {
    setChapter(chapterList)
})

mp.add_key_binding("Ctrl+w", "writeChapterToFile", function () {
    writeChapterToFile(chapterList)
})