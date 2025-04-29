[nvm for linux](https://github.com/nvm-sh/nvm)
# Git安装
1. 克隆项目到$HOME目录
2. 将项目文件夹重命名为 `.nvm`
3. 添加下列内容到`.bashrc`文件:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
4. 查看node可用版本`nvm ls-remote`
5. 安装node版本`nvm install v22.15.0`或`nvm install --lts`
6. 创建`.nvmrc`文件指定开机默认node版本
    这个文件也可以放在项目的根目录下，用于`nvm use`未指定版本参数时读取的默认值
7. 设置开机自动使用，在`.bashrc`中添加`nvm use > /dev/null`语句


# 一些想法
nvm管理的node和pacman安装的node本质并没有什么区别，但仍有一些值得提出：
1. nvm管理的node程序路径一般在nvm程序目录的version子目录中集中管理
   而pacman安装的nodejs则位于系统的目录中，如`/usr/bin/node`及`/usr/include/ndoe`
2. 两者都是通过系统环境变量进行调用，pacman安装的nodejs位于通用的`/usr/bin`目录
   而nvm安装的nodejs则位于特定目录，为了调用nvm的nodejs，其会在环境变量中添加
   通过其安装的nodejs的目录，且为了将nvm nodejs的调用优先级高于pacman nodejs，
   nvm添加的环境变量一般在`/usr/bin`前面
