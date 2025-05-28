# Notes For Docker
## 环境准备
### linux下的docker使用
#### 安装
使用`pacman -S docker`安装docker
#### 配置
docker的配置比较复杂，存在容器[container]、守护进程[daemon]、命令行接口[CLI]等多
种概念。
##### 守护进程
###### [代理配置](https://docs.docker.com/engine/daemon/proxy/)
1. docker守护进程的配置文件为`/etc/systemd/system/docker.service.d/http-proxy.conf`
```http-proxy.conf
[Service]
# 代理宿主机的IP及端口（协议及域名的形式后续测试）
Environment="HTTP_PROXY=172.20.224.1:7890"
Environment="HTTPS_PROXY=172.20.224.1:7890"
```

2. docker镜像站
`/etc/docker/daemon.json`配置`registry-mirrors`字段：
```json
{
    "registry-mirrors":[
        # 仅示例，自行添加可用镜像站
        "https://docker.1ms.run"
    ]
}
```










### windows下docker使用
- [Notes For Docker](#notes-for-docker)
  - [环境准备](#环境准备)
    - [linux下的docker使用](#linux下的docker使用)
    - [windows下docker使用](#windows下docker使用)
      - [WSL安装](#wsl安装)
        - [前置工作](#前置工作)
        - [安装WSL](#安装wsl)
      - [使用WSL](#使用wsl)
  - [Docker Desktop安装](#docker-desktop安装)
    - [linxu下安装](#linxu下安装)
    - [windows下安装](#windows下安装)
  - [Docker的使用](#docker的使用)
    - [关于Docker Desktop的创建容器示例](#关于docker-desktop的创建容器示例)
    - [docker使用](#docker使用)
      - [导出镜像](#导出镜像)
# Notes For Docker
## 环境准备
### linux下的docker使用
后续补充
### windows下docker使用
> windows可以安装[Docker Desktop](https://www.docker.com/)进行docker的安装及学习用  
> windows需要安装WSL2以作为Docker Desktop安装的基础

#### WSL安装
##### 前置工作
1. 启用“适用linux的windows子系统”功能，使用管理员运行powershell执行下面命令
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
2. 启用“虚拟机”功能，使用管理员运行powershell执行下面命令
```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
3. 安装[最新的WSL2 linux内核更新包](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
4. 将WSL2设置为默认版本，使用管理员运行powershell执行下面命令
```powershell
wsl --set-default-version 2
```
##### 安装WSL
```POWERSHELL
wsl --list --online     #查看发行版列表
wsl --install           #新版windows直接安装Ubunyu
# 如果需要安装其他的发行版linux则可以采用下列命令
wsl --install --distribution <Distribution Name>
# <Distribution Name> linxu发行版名称
```
#### 使用WSL
```powershell
wsl --list --verbose    #列出已经安装的linux发行版
wsl --status            #查看WSL状态
# 运行linux发行版
wsl --distribution <Distribution Name> --user <User Name>
wsl --shutdown          #关闭所有WSL
#关闭指定WSL
wsl --terminate <Distribution Name>
#导出指定WSL
wsl --export <Distribution Name> <FileName>
#导入指定WSL
wsl --import <Distribution Name> <InstallLocation> <FileName>
#卸载指定WSL
wsl --unregister <DistributionName>
```
## Docker Desktop安装
### linxu下安装
后面记录
### windows下安装
运行下载好的docker desktop安装程序
## Docker的使用
### 关于Docker Desktop的创建容器示例
```powershell
#创建一个自定义名称的容器并运行一条命令
docker run --name <name> IMAGE <command>
docker run --name repo alpine/git clone https://github.com/docker/getting-started.git
#复制文件
docker cp <source_dir> <target_dir>
docker cp repo:/git/getting-started/ .
#使用Dockfile创建镜像
docker build -t <image_name> PATH
docker build -t docker101tutorial .
#从镜像创建容器[-d]后台运行并指定容器的[-name]名字及[-p]端口
docker run -d -p <hostPort>:<containerPort> -name <containerName> IMAGE
docker run -d -p 80:80 --name docker-tutorial docker101tutorial
```

### docker使用

```shell
docker run -d --name=xunlei --hostname=yoophoon --net=host -v /path/to/xunlei:/xunlei/data -v /path/to/downloads:/xunlei/downloads --restart=unless-stopped --privileged cnk3x/xunlei:latest

```
#### 导出镜像
