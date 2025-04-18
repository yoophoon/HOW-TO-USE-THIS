# 使用记录(onWindows)
## 安装
可以通过下列途径获取mpv：
1. [sourceforge](https://sourceforge.net/projects/mpv-player-windows/files/)
2. [github](https://github.com/shinchiro/mpv-winbuild-cmake/releases)
3. [包管理器]()如linux的`pacman`等

获取安装包解压安装即可
1. [下载MPV](https://mpv.io/installation/) 可以下载已经编译好的安装包，或者自己构建工程[源码编译](https://github.com/mpv-player/mpv)
2. 安装MPV 直接采用了[sourceforge的发行版](https://sourceforge.net/projects/mpv-player-windows/files/)软件无需安装，解压缩后包含如下文件：  
```bash
   # inputfile除非使用input-conf-file命令重新加载input.conf，否则程序指挥加载最高优先级的input.conf
   # 存放在当前文件夹的配置文件的优先级介于第二优先级与第三优先级中间
.  # mpv的配置文件先加载优先级低，后加载优先级高
├── d3dcompiler_43.dll    # DirectX SDK的组件用于编译和优化着色器，软件自带
├── doc                   # 
│   ├── manual.pdf        # 用户手册
│   └── mpbindings.png    # 键位功能表
├── installer             # windows下的安装卸载脚本，如 .bat .ps
├── mpv                   # 软件第三顺位查找配置的文件夹，最高优先级，不建议使用，未来可能会被移除
│   └── fonts.conf
├── mpv.com               # 命令行程序，基本不用，mpv自带commandLine
├── mpv.exe               # 主程序
├── !* portable_config    # 软件第二顺位查找配置的文件夹，中等优先级
│      └── mpv.conf       # 为方便配置文件管理，配置文件仅配置两行命令 include=pathToConfigfile;input-conf=pathToInputconf
├── !  shaders            # 用户添加的第三方着色器[Anime4K](https://github.com/bloc97/Anime4K)
└── updater.bat           # 程序更新脚本
```
> 目录树中符号：  
> -  *:重要 
> -  !:程序不自带，用户添加的
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
