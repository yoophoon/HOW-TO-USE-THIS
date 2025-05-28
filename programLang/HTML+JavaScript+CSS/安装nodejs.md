# 在ubuntu 安装nodejs
默认ubuntu的包管理器安装的nodejs和npm版本都非常老，通过下面命令可以实现安装指定
版本的[nodejs](https://github.com/nodesource/distributions)
```bash
# 路径setup安装最新版，后缀_version安装指定版本
curl -sL https://deb.nodesource.com/setup_20.x | bash -
apt list -a nodejs
apt-get install -y nodejs
```
