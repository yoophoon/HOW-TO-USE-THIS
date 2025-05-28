// ==UserScript==
// @name         My Time.is 简化版
// @namespace    http://tampermonkey.net/
// @version      2024-02-15

// @description  try to take over the world!
// @author       You
// @match        time.is
// @icon         https://time.is/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload=function(){
        document.querySelector("#top").style.display="none";//隐藏顶部  logo、搜索框及菜单
        document.querySelector("#msgs").style.display="none";//隐藏系统误差及地址
        document.querySelector("#locw a").style.display="none";//隐藏更多信息
        document.querySelector("#recover").style.display="none";//隐藏探索标签
        document.querySelector("#top_cities_tmp").style.display="none";//隐藏全球重要城市标签
        document.querySelector("#menupositioner").style.display="none";//隐藏底部导航
        document.querySelector("#quote").style.padding="100px 5%";//指定底部区域高度
        document.querySelector("#quote").style.position="fixed";
        document.querySelector("#quote").style.top="70vh";
        document.querySelector("#quote").style.height="30vh";




        document.querySelector("#mainwrapper").style.position="fixed";
        document.querySelector("#mainwrapper").style.top="10vh";
        document.querySelector("#mainwrapper").style.height="50vh";
    }
    
    // Your code here...
})();

function hideEle(hideEle){
hideEle.display="none";

}
