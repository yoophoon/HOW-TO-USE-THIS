# 使用记录(onWindows)
1. [下载MPV](https://mpv.io/installation/) 可以下载已经编译好的安装包，或者自己构建工程[源码编译](https://github.com/mpv-player/mpv)
2. 安装MPV 直接采用了[sourceforge的发行版](https://sourceforge.net/projects/mpv-player-windows/files/)软件无需安装，解压缩后包含如下文件：  
- doc文件夹 文档手册
- mpv文件夹 配置文件集合
- mpv.com 命令行程序，会在命令行输出播放器的一系列信息
- mpv.exe 主程序，如果在命令使用这个将会后台工作并不会输出任何信息
## 配置MPV
1. 关联文件
2. 编写配置文件
3. 自定义快捷键
4. 配置插件
### 自动加载脚本
下面两个路劲会自动加载  
`~~\portable_config\scripts\`  
`~~\portable_config\script-opts\`  
### 创建播放列表
#### windows
```powershell
Get-ChildItem -Name > playlist.txt
mpv --playlist=playlist.txt
```
