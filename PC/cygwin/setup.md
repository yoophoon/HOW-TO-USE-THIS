# 安装[cygwin](https://cygwin.com/)
## 配置右键菜单
**路径不能含有中文字符**，中文字符可能会导致某些路径解析出问题
### 针对空白右键([shift]+鼠标右键)
1. `win+r`+`regedit`
2. 打开路径`HKEY_CLASSES_ROOT\Directory\Background\shell`
3. ```
   shell┐
        └cygwin┬┬(default)  data:Cygwin Here
               │└Icon       data:C:\cygwin64\Cygwin-Terminal.ico
               └command─(default) data:C:\cygwin64\bin\mintty.exe -i /Cygwin-Terminal.ico -c "cd $(cygpath '%V'); exec bash"
> 解释：
  -i,--icon file  指定图标icon，一般不需要指定，mingtty会默认加载图标
  -c,--config File  加载指定的配置文件（copilot给的提示是错的）
  这里的设置不会包含默认的环境变量如`/usr/local/bin`和`/usr/bin`，需要在`.bashrc`手动导入
  mintty不指定参数会以当前目录作为默认路径
### 针对文件夹右键
1. `win+r`+`regedit`
2. 打开路径`HKEY_CLASSES_ROOT\Directory\shell`
3. ```
   shell┐
        └cygwin┬┬(default)  data:Cygwin Here
               │└Icon       data:C:\cygwin64\Cygwin-Terminal.ico
               └command─(default) data:D:\Github\how-to-use-this\PC\cygwin\cygwinOnFolder.bat '%1'
> 解释
  因为mintty的初始路径是针对unix路径的而右键操作获取的路径为window路径，所以需要对路径进行转换  
  这里单纯的用注册表一条命令已经无法实现了，故需要采用[脚本](./cygwinOnFolder.bat)的方式先将window路径转换为unix路径  
  然后再调用mintty时将转换过后的路径作为其初始路径加载  
  运行脚本会出现闪烁的cmd窗口，可以采用[b2e](https://github.com/tokyoneon/B2E)将其转换为隐藏的exe程序  
## 环境变量
因为通过右键菜单的方式均为直接操作mintty而非正常登入的行为，所以进入mintty之后的PATH会缺少`/usr/bin`及`/usr/local/bin`两个环境变量，这点需要在`~/.bashrc`中进行处理，[额外配置](./.bashrc)只是一种粗浅的尝试，也许会有一种更好的方式  
## 包管理
### setup安装软件
### [apt-cyg](https://github.com/transcode-open/apt-cyg)安装软件
[参考文章](https://blog.csdn.net/m0_51390969/article/details/135414734)
1. 安装包管理器 `git clone apt-cyg$$cd apt-cyg$$install apt-cyg /bin`
2. 可能出现格式问题 `dos2unix /usr/bin/apt-cyg`
### 在vscode中使用cygwin
bash会自动将当前目录转换为初始目录
```JSON
"Cygwin": {
    "path": "C:\\cygwin64\\bin\\bash.exe",
    "icon": "terminal-linux",
    "args": [],
    "overrideName": true
}
```
# 一些概念
- `/`对应`cygwin`的安装目录，所以`~`<=>`/home/userhome`<=>`path/to/cygwin/home/userhome`(实际windows路径)

### nice post
[git 入门教程之 git bash 竟然不支持 tree 命令](https://www.cnblogs.com/snowdreams1006/p/10812861.html)
