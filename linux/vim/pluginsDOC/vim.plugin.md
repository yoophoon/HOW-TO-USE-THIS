1. 轻量级排版插件[tabular](https://github.com/godlygeek/tabular)
- cd /etc/share/vim/vim91/pack/dist/opt
- sudo git clone https://github.com/godlygeek/tabular
- `:packadd tabular`
- 使用方式：tabular会将存在分隔符的文本块作为一个整体进行排版
            `:Tab /./r1l1c0
            "将当前文本块按.排版，第一个字段右对齐并在后续字段前面添加一个空格
            "第二个字段左对齐并在后续字段前面添加一个空格，第三个字段居中对齐，
            "后续字段不添加空格，如果一行文本存在多个分隔符则循环采用排版方式
            `:Tab /^[^.]\zs./r0c1l1
            "以第一个字符 . 进行排版，这里用到了vim的正则表达式
            "更多的信息查询[tabular.txt]($/tabular/doc/tabular.txt)
- 复杂内容: 使用AddTabularPipeline  |:AddTabularPipeline|

2. [netrw]()
- 使用`:Lexplore`打开netrw窗口



3. 插件管理器[vim-plug](https://github.com/junegunn/vim-plug)
