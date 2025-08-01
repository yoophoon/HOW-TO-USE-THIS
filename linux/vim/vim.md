可以通过一下途径安装vim：
    1. 包管理器
    2. 二进制文件
    3. 源码编译
      3.1 vs2022编译vim源码
      1. 克隆vim仓库
      2. 配置路径 `src\msvc2022.bat x86_amd64`命令
      3. 编译 `nmake -f Make_mvc.mak [options]`命令
      4. 更多信息查阅 [vim](https://github.com/vim/vim)，src目录给了安装文档
# VIM
入门操作  vimtutor
[vim-galore-zh_cn](https://github.com/wsdjeg/vim-galore-zh_cn)
推荐书籍  https://iccf-holland.org/vim_books.html 
## 约定
1. 命令组合采用`-`连接，如 切换窗口: CTRL-w
2. 命令字母应该采用小写，大写字母应转换为: SHIFT-lowcase
3. 修饰键(Modifier Keys)采用全拼大写，如 CTRL、SHIFT
4. 相同命令出现在不同模式则采用对应模式小写首字母加下划线作为命令前缀，如 i_CTRL-o
5. 正常模式命令不加模式前缀,如o:表示正常模式在当前光标下方新增一行; v_o:表示可视模式在选中文本两端移动
## 一些概念
command  命令vim处理的最小单元,独立命令或组合命令       如dw 删除光标之后的一个单词，dw为组合命令;删除光标至当前单词尾部内容，cw为独立命令
operator 操作符                                           dw 前面的d就是操作符 
motion   本身也是一种命令，但可以和operator进行组合       dw 后面的w指示操作符操作的内容  即光标后方的一个单词
- 移动命令不允许跟`{motion}` 命令本身就涵盖motion的意义
- motion前面一般可以设置`[count]` 表明这个motion重复多少次
command = [<Modifier Keys>] operator [count] [motions]  :help d
jump     与motion的概念类似，可以控制光标位置，但因为无法和operator进行组合，所以被单独划分为 jump command
pattern  匹配模式               常用于正则、文字搜索、替换等命令  :help pattern
## operator
### 移动  
**移动命令不能跟motion**其本身有motion的含义，所以移动类操作符一般可以接受 [count] 如跳转至文件第5行5-gg|5-SHIFT-g|~~5G~~
#### 常见的移动operator
当前页面内移动: h、j、k、l           左、下、上、右 
w、b e
#### 窗口切换
CTRL-w
### 删除  
本质为将选中的内容移除并放置至寄存器
#### 常见的删除operator
d
x -> dl -> \<Del>  删除光标之后n个字符，默认字符数量1，Delete只能删除一个字符

### 复制|yank
yw  复制一个单词  这个命令并非是复制光标所在单词而是复制光标所在位置到下一个单词开始位置间的内容
yy  复制整行

### 粘贴  
本质为将寄存器中的内容取出
#### 常见的粘贴operator
p
### 替换  r(eplace) 区别于搜索替换
r   替换光标之后的第一个字符
R   进入替换模式
### 修改  c change: 删除并进入Insert Mode
c for change 本质为删除并进入插入模式(Insert Mode)
#### 常见的修改operator
ce
cc  类似于dd但会保留一个换行符
### 搜索|search
/
?   反向搜索
%   搜索当前光标位置处的配对符号 如 () [] {} 

#### 关联operator
1. n        搜索下一个
2. SHIFT-n  搜索上一个
3. ?        反向搜索，这个操作符相对于 / 即一开始就搜索上一个而后者一开始就搜索下一个
4. CTRL-o   返回上一处位置
5. CTRL-i   前往下一处位置
### 替换|substitute
:s/old/new      使用new替换下一个搜索到的old
:s/old/new/g    /g 标识符:替换当前行全部
:[startline,endline]s/ole/new/gc  在指定行范围内高亮确认是否替换
命令的一般形式为: help :s
- :[range]s[ubstitute]/{pattern}/{string}/[flags] [count]
将范围内的每一行中的pattern替换为string
### 执行外部命令|execute external command
:!command [options...] [args...] <ENTER>
### 保存文件|writing text to file
:w newFileName
> :w 命令只是将当前vim的buffer写到指定文件，当前buffer指向的文件依然为通过vim打开的文件
### 选择文本保存
查看 vimtutor 1.5.3: SELECTING TEXT TO WRITE
### 读入内容
:r [filename|external command output]
:r /path/to/file    # 将file文件的内容放置到光标之后
:r !ls              # 将外部命令ls的输出内容放置到光标之后

### 设置选项
永久配置选项
  查看 ./vimrc 文件 用户永久设置文件
  modeline          文件永久设置，set modeline

临时配置选项
  :set option

### 模式切换
模式                        快捷方式       解释
                       |mode-switching|
                                                        **概念服务于按键映射**
                                                                  |mapmode-nvo|
|nmode|     普通模式        |<Esc>|         其他模式使用esc键返回该模式
|xmode|     可视模式        |v|             字符级可视模式
                            |V||<Shift-v>   文本行可视模式
                            |<Ctrl-v>|      文本块可视模式
|smode|     选择模式        |gh|            与可视模式类似但又有些差异 |Select|
|vmode|                                     可视模式与选择模式, 常用于按键映射
|omode|     操作符待定模式                  指输入操作符等待后续输入如文本对象
                                            较常见的为字符修改操作
                                                                  |mapmode-ic|
|imode|     插入模式        |i|             输入文本
|lmode|     lang-args                       有点复杂等看完map章节之后再解释
|cmode|     命令行模式      |:|             要前缀':'执行的命令的模式
|tmode|     终端模式        |:terminal<CR>| 通过vim打开的终端
                                                       **概念服务于编辑操作**
|Ex|        扩展模式        |Q||<Shift-q>   |:vi[sual]|可返回普通模式
                                           注: 其他模式下|:vi|与|:e[dit]|命令
                                               效果一样
|rmode|     替换模式        |r||<Shift-r>|  字符替换模式, 这个|s||:s|有着根本性
                                            的不同. 前者体现vim的模式编辑而后者
                                            只是vim的命令
 vim的主要概念就是模式编辑, 后续继续补充相关模式内容


## 命令

i_CTRL-o      执行命令并返回插入模式
v_o           可视模式文本块两端移动
v_CTRL-g      <=>  s_CTRL-g   可视模式和选择模式互相切换
diw           删除光标所在单词
dd            删除当前行
dw            删除至下一个单词开始位置
                dw  是组合命令  command=operator + motion
                dw与cw的命令形式完全不同，前者为组合命令而后者则为独立命令(一个整体)
                两者执行结果也完全不同，前者会将光标至下个单词开始位置内容全部删除而后者仅删除光标位置至当前光标所在单词结束位置的内容
s / S         替换 字符 / 行并进入插入模式，后者与cc有点类似
cw            删除光标到当前单词的结束位置并进入插入模式
                cw  是独立命令  command=command
                cw是change command本身为一个整体
ciw           删除当前光标所在档次并进入插入模式
                ciw 是组合命令  command=operator + motion   
                ciw则是组合命令，operator:c command,motion<text-object-selection>:iw 
u / CTRL-r    撤销与重做  redo / undo
f / F         单字符查找 find，向右 / 左查找，/ 命令的简化版
w / e / b     下一个单词开始/结束/上一个单词开始位置
0 / ^ / $     行首 / 行首 / 行尾
H/L           移动至当前窗口的顶部和底部
gg            移动至文档首部
G             移动至文档尾部
CTRL-o        向上一个位置跳转  *CTRL-o / CTRL-i在vim中为跳转命令而不是 motion 命令*
CTRL-i        向下一个位置跳转
CTRL-f        PAGEDOWN，向下翻页，以pages为准
CTRL-b        PAGEUP，向上翻页
CTRL-d        WINDOWDOWN，向下移动窗口，以window为准
CTRL-u        WINDOWUP，向上移动窗口




## 命令提示与补全
vim的命令模式提供命令提示与补全功能，CTRL-d会提示当前输入可能匹配的命令 <TAB>则会补全唯一的命令(这里指当前输入的命令潜在的完整命令只有一个)

## 多用help
:help online-help       # 帮助文档的帮助文档
:help c_CTRL-D
:help insert-index
:help user-manual
### 帮助文档的元素
得益于vim的tags系统，帮助文档可以实现很灵活的跳转。   :help tags
subject     主题        
tag   |tagname|     由双竖线包裹标签名组成，有点类似html的超链接
anchor  *tagname*   由双\*包括组成
### 如何阅读帮助文档

### $VIMRUNTIME下有一些脚本例子
msys2的 vimruntime-> /usr/share/vim/vim91/

## 一些命令的理解
<C-[S]-r> redo undo   | :help Ctrl+R    形式上似乎是 C-S-r的格式，但C-r也生效，可以认为C-S-r=C-r

## 宏
## 窗口 help split
窗口的概念是相对于用户可见的部分
### 窗口拆分
s / C-w,[C-]s             split，将当前窗口竖向平分
vs / C-w,[C-]v            vertical，将当前窗口横向平分
### 窗口移动
C-w,{motion}  如h，j，k，l  将光标移动至左、下、上、右方窗口
## tab  help tabpage
tabpage(标签页)类似于浏览器tab的概念，所有的window概念都是相对与当前用户可视的tabpage
:tabnew / :tabe           新建标签页，可跟文件名即在新标签页打开指定文件的buffer
:tabn / :tabp             前往下一个标签页/上一个标签页
:tabm                     移动当前标签页

## buffer 缓冲区
:ls / :buffers / :ls!     列出所有缓冲区

## 寄存器 register
"                         双引号引用具名寄存器

## 范围 command ranges (:help 10.3)

## 标记 mark
m                         设置mark，可用mark标识符  [a-z] 当前文件生效  [A-Z]全局生效 [0-9]vim记录改动位置
' / g' / ` / g`           跳转至指定mark标识符位置  motion跳转  [   修改或复制的第一行或第一个字符
                                                                ]   修改或复制的末尾行或末尾字符
                                                                <   可视模式选取的第一行或第一个字符
                                                                >                 末尾行或末尾字符
                                                                '   上次跳转的光标位置
                                                                "   上次关闭的缓冲区光标位置
                                                                ^   上次插入字符之后的光标位置
                                                                .   上次修改文本之后的光标位置
                                                                (   句子开头
                                                                )   句子结尾
                                                                {   段落开头
                                                                }   段落结尾
## 补全 completion help i_CTRL-x
i_C-x         插入模式  选择补全模式
i_C-n         下一个匹配模式补全
i_C-p         上一个匹配模式补全


## 自动命令
i_C-h         删除光标前一个字符
i_C-j         向光标上方插入新行
i_C-k         digraph 相关  help diagraph
i_C-l         当insertmode启用时，切换到正常模式(启用insertmode设置会将vim的默
              认模式设置为insert) 正常模式是插入符号

## 保存当前工作
:mkexrc       将当前vim的配置保存到当前目录的.exrc文件中
:mkvimrc      将当前vim的配置保存到当前目录的.vimrc文件中
:mksession    将当前的工作保存到当前目录的Session.vim文件中
> 上面3个命令都可以指定保存的文件，看个人喜好使用默认文件名或者自定义文件名



# Command-line window





































