# 安装
1. 下载[coc.nvim源码](https://github.com/neoclide/coc.nvim)
    `git clone https://github.com/neoclide/coc.nvim`
2. 将源码放置在`$HOME/.vim/pack/coc/start/`目录下
    这里有两个点需要注意：1. 目录中的coc名字仅用于表示包的名称
                          2. 下层目录start有讲究，如果不是优先启动项可以采用`opt`
    这里牵扯到vim原生包管理器的加载规则，查询`:help packadd`获取更多信息
3. 先决条件
    [nodejs]版本需要大于或等于16.18，vim版本需要大于或等于9.0.0438
4. 将coc的帮助文档加入到vim
    进入存放coc.nvim项目的文件夹并执行`:helptags coc.nvim/doc/`即可使用bim自带
    的帮助系统查阅coc的帮助文档
# 使用
coc.nvim并非一个开箱即用的插件，它本质是利用nodejs创建的一个插件平台，要使vim能
使用coc.nvim的自动补全功能需额外安装coc的插件
1. 安装插件
    `:CocInstall coc-tsserver`即可安装coc的插件，插件目录|g:coc_data_home|一般在
    `$HOME/.config/coc`
