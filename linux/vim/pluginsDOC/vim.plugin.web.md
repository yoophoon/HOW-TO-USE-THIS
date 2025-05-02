# HTML emmet语法
emmet官方推荐vim第三方插件[emment-vim](https://github.com/mattn/emmet-vim)

# coc前端4件套
:CocInstall coc-tsserver coc-json coc-css coc-html

# 调试
`npm install -g chrome-debug-adapter`
vim调试采用[vimspector](https://github.com/puremourning/vimspector.git)
## 安装
这里使用vim自带包管理器进行安装，安装路径为`$HOME/.vim/pack/vimspector/start/vimspector`
## 安装调试适配器

## 碰见的问题
1. 第一跟着教程碰见无法链接调试适配器的问题:
╔════════════════════════════════════════════════════════════════X
║ Unable to start or connect to debug adapter                    ║
║                                                                ║
║ Check :messages and :VimspectorToggleLog for more information. ║
║                                                                ║
║ :VimspectorReset to close down vimspector                      ║
╚════════════════════════════════════════════════════════════════╝















































                                                                                                            
来自chatgpt
在 Vim 里调试前端项目，通常需要结合 LSP（Language Server Protocol）、浏览器同步 和 调试工具，以下是实现方法：

1. 启用 LSP 以支持 JavaScript/TypeScript
前端项目通常使用 JavaScript 或 TypeScript，推荐安装 coc.nvim 或 vim-lsp 以提供 代码分析、补全、跳转 等功能。

安装 coc.nvim
在 vimrc 里添加：

vim
Plug 'neoclide/coc.nvim', {'branch': 'release'}
然后在 Vim 里执行：

vim
:PlugInstall
:CocInstall coc-tsserver coc-json coc-html coc-css
这样就安装了 TypeScript/JavaScript、JSON、HTML、CSS 语言服务器。

📌 调试支持

gd 跳转到定义

gr 查找引用

:CocCommand tsserver.rename 变量重命名

:CocDiagnostics 查看错误

2. 使用 browser-sync 进行自动刷新
如果你希望在 Vim 里编辑文件后自动刷新浏览器，可以使用 browser-sync：

bash
npm install -g browser-sync
browser-sync start --server --files "*.html, *.css, *.js"
这样，所有 HTML/CSS/JS 变更都会触发浏览器自动刷新。

3. 配合 chrome-debug-adapter 进行 JS 断点调试
Vim 可以直接调试 JavaScript 代码，类似于 VSCode 的调试功能：

bash
npm install -g chrome-debug-adapter
然后在 Vim 里运行：

vim
:CocCommand debug.start
可以在 JavaScript 代码里 断点调试，查看 console.log() 输出。

4. 使用 vim-test 运行前端测试
如果你在前端项目中写了 Jest 或 Mocha 测试，可以用 vim-test 快速运行：

vim
Plug 'vim-test/vim-test'
然后：

vim
TestNearest
TestFile
TestSuite
这样可以 快速运行测试 并查看结果。

总结
功能	插件/工具	作用
代码跳转	coc.nvim	gd、gr
自动刷新浏览器	browser-sync	监听文件改动
JavaScript 调试	chrome-debug-adapter	断点调试
运行测试	vim-test	一键执行前端测试
如果你希望 Vim 提供 类似 VSCode 的调试体验，可以结合 LSP、调试插件 和 自动刷新工具 让前端开发更流畅！你希望调试 React/Vue 还是一般的 JS 代码？😃
