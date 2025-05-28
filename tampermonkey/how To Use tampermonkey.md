# 一些记录
## [`@require`引用外部资源](https://www.tampermonkey.net/documentation.php?ext=iikm&version=5.0.1#meta:require)
- 概述  
`// @require https://code.jquery.com/jquery-2.1.4.min.js`引用外部资源(https)  
`// @require tampermonkey://vendor/jquery.js`引用外部资源(油猴 *`tampermonkey`协议尚不清楚用法*)  
- 子资源完整性验证  
`// @require https://code.jquery.com/jquery-2.1.3.min.js#sha256=23456...`和`// @require https://code.jquery.com/jquery-2.1.2.min.js#md5=34567...,sha256=6789...`都支持  
*该处存在`window.crypto`用法尚未补齐*
- 本地资源  
`// @require file://D:\Github\how-to-use-this\tampermonkey\biquge365.net阅读背景调整.js`可以调用本地文件，方便脱离浏览器进行代码编辑，需要在扩展设置中启用(扩展->已安装的扩展->详细信息->允许访问文件URL)，显示如下  
  - [x] 允许访问文件 URL
## 通过webhook同步脚本到[greasyfork](https://greasyfork.org/zh-CN)  
在项目仓库→设置→webhook中设置  

参数说明：  
  - payload URL：接受响应的地址，如(greasy fork):`https://greasyfork.org/zh-CN/users/identification/webhook`  
  - content Type:内容类型，github提供了`application/x-www-form-urlencoded`和`application/json`两种类型  
  - secret 密钥 通信安全凭证
## [GM_addStyle]()
- 概述  
在document.head中插入style元素，eg:`GM_addStyle(".my-points-card,.layout-header{height:150px !important}")`将会在head的尾部插入如下元素  
    ```html
    <head>
        ......
        <style>
            .my-points-card,.layout-header{
                height:150px
            }
        </style>
    </head>
    ```
  `// @grant GM_addStyle`声明是必须的
- 杂述  
可以通过`let nodeStyle=document.createElement('style')`及`document.head.appendChild(nodeStyle)`将创建的`style`标签添加到documen.head中，并通过`nodeStyle.sheet.insertRule(userCSS)`设置userCSS，文档不会直接显示userCSS，可以在插入的标签的属性中查看而`GM_addStyle(userCSS)`则是直接显示userCSS
## [GM_download]()
- todo


## 开发流
为方便集中管理脚本文件，油猴插件内容均采用`require`meta指令引用仓库脚本文件
油猴脚本内容采用@name、@match、@icon、@require等字段以满足脚本最小生效条件
- @name : 以前缀(YYYYMMDD____localdebug_domain)格式创建
- @math : 油猴生效的条件之一
- @icon : 油猴的文件图标，增加脚本的辨识度
- @require : 引用本地文件的指令以实现脚本集中管理
