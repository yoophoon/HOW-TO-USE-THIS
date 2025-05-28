# [Docker Build](https://docs.docker.com/build/)
## 核心概念
### 构建概况
docker 构建实现了客户端-服务端架构
- 客户端:|Buildx|运行并管理构建工作的前端及用户接口
- 服务端:|BuildKit|实施构建工作的服务端或构建器
- Buildx:用于运行构建的命令行接口工具
- BuildKit:实施构建工作的守护进程
> `command run`只是**buildx**的包装，这三者的概念类似于：
> `command` <--> `docker run`
> `bash`    <--> `Buildx`
> `kernel`  <--> `BuildKit`
`Buildx`及`BuildKit`都在docker(Docker Desktop&Docker Engine)中集成了，感觉这两都
是docker的内部概念，实际上用户一般调用`docker build`命令docker就自动应用该工作流

### Buildx
- 负责解释`docker build`命令并向后端`BuildKit`发送构建请求
- 创建并管理后端`BuildKit`
- 管理docker镜像仓库的镜像
- 并行多个构建任务
`docker build`又分为`docker build`和`docker buildx build`，查阅[Difference between docker build and docker buildx build](https://docs.docker.com/build/builders/#difference-between-docker-build-and-docker-buildx-build)
这里应该与docker的线上工作流相关，docker本身能登入到远程服务器的

### BuildKit
处理前端`Buildx`发送的构建请求，构建请求的内容包括：
- Dockerfile文件
- 构建参数
- 导出选项
- 缓存选项
`BuildKit`解析这些构建指令并执行构建流程。`Buildx`则监测构建状态并打印到终端
如果构建工作需要客户端的资源则会经由`BuildKit`向`Buildx`请求所需的资源，如：本地
文件或构建所需的敏感信息(这里最新版对工作流进行了优化即只会在需要资源时才会请求，
而老版本则总是复制一份本地文件系统)
`BuildKit`可以向`Buildx`请求的资源包括:
- 本地文件系统构建上下文
- 构建所需的隐私信息
- SSH 通信
- 镜像仓库认证凭证

## Dockerfile概况
### Dockerfile
构建工作的核心，Docker通过读取Dockerfile文件中的指令构建镜像。Dockerfile文件则包
含用于构建源码的指令。Dockerfile指令语法由[参考规范](https://docs.docker.com/reference/dockerfile/)定义。

常用的构建指令：
|指令|解释|
|:-|:-|
|`FROM <image>`|定义要构建镜像的基础|
|`RUN <commands>`|在当前构建的镜像的新顶层执行命令并提交结果或运行shell命令|
|`WORKDIR <directory>`|设置Dockerfile文件随后的`RUN`,`CMD`,`ENTRYPOINT`,`COPY`及`ADD`命令的工作目录|
|`COPY <src> <dest>`|从`<src>`路径复制新文件或文件夹到容器文件系统指定的`<dest>`路径|
|`CMD <command>`|定义基于构造镜像的容器在首次启动时的默认程序(命令?)。每个dockerfile只有一个`CMD`指令，如果存在多个的话则只采用最后一个指令|

Dockerfiles对于构建镜像是至关重要的输入且便于自动构建基于用户配置的多层镜像构建。
Dockerfile可以根据需求支持简单到复杂的场景

### Docker images
Docker镜像是由各层(功能)组成。每一层都由Dockfile的构建指令生成。各层按序列堆叠
并且处理呈现应用于前一层的变更。
#### 样例
下面是一个典型的Docker构建应用程序的工作流，样例代码展示一个以Python编写
使用`Flask`框架的"Hello World"小程序：
```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```
如果不用Docker Build发布部署这个程序，这需要：
- 服务器需要安装必要的运行时依赖
- Python代码需要上传到服务器的文件系统中
- 服务器使用必要的参数启动该程序
下面的Dockerfile创建了一个安装了全部依赖并且自动启动程序的容器镜像
```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==3.0.*

# install app
COPY hello.py /

# final configuration
ENV FLASK_APP=hello
EXPOSE 8080
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8080"]
```
下面对Dockerfile的工作进行分解:
#### Dockfile syntax
添加到Dockfile的第一行是`# syntax`解析指令。尽管是可选的，这条指令指导Docker的
构建器在解析Dockerfile时该使用的语法以及允许启用BuildKit的老版本Docker在开始构建
工作时使用特定Dockfile前端。解析器指令必须在注释、空白符或Dockerfile指令前设置并
处于Dockerfile文件的第一行。
```dockerfile
# syntax=docker/dockerfile:1
```
> 建议使用`docker/dockerfile:1`，这总是会指向version 1语法的最新发行版。BuildKit
> 会在构建之前自动检查语法的更新以确保使用的是最新版语法解析

#### 基础镜像
在语法指令随后的一行定义了要使用的基础镜像：
```dockerfile
FROM ubuntu:22.04
```
`FROM`指令设置基础镜像位Ubuntu 22.04发行版。随后所有的指令都在基础镜像中运行：
Ubuntu的环境变量。标记`ubuntu:22.04`按照`name:tag`标准命名镜像。当构建镜像时也
应该使用这样的标记命名镜像。有许多公开镜像可通过Dockerfile的`FROM`指令导入到构建
流程以供用户在自己的项目中使用，[Docker Hub](https://hub.docker.com/search?image_filter=official&q=&type=image&_gl=1*pkl4fu*_gcl_au*NzY5MTM4MDA3LjE3NDQ0MDAwNzE.*_ga*NjkwNzQ4OTMxLjE3NDQ0MDAwNzE.*_ga_XJWPQMJYHQ*czE3NDY5MzU0MzQkbzEyJGcxJHQxNzQ2OTM2ODQxJGo2MCRsMCRoMA..)包含了大量可使用的官方
镜像。

#### 设置环境变量
随后一行在基础镜像中执行一条构建命令：
```dockerfile
# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
```
`RUN`指令在容器中的Ubuntu中执行了一条更新APT包索引并安装Python工具。

#### 注释
注意`# install app dependencies`这一行。这是一个注释。Dockerfile中的注释以`#`符号
开始。随着Dockfile的迭代，注释可以告知未来的读者、编辑人员或自己这个Dockerfile
是如何工作的。
> 只有首行符合语法指令的语句会被解析其余的都会被当作注释

#### 安装依赖
第二条`RUN`指令安装Python程序必要的`flask`依赖
```dockerfile
RUN pip install flask==3.0.*
```
这条指令的先决条件是`pip`已安装到构建的容器中。第一条安装`pip`的`RUN`命令确保了
可以使用命令安装`flask`web框架。

#### 复制文件
下一条指令使用了`COPY`指令将`hello.py`文件从本地构建上下文复制到镜像的根目录
```dockerfile
COPY hello.py /
```
构建上下文是一系列可以通过Dockerfile文件中的指令访问的文件，如`COPY`、`ADD`指令
执行完`COPY`指令之后，`hello.py`文件就会被添加到构建容器的文件系统中。

#### 设置环境变量
如果应用程序使用了环境变量则可以在Dockerfile文件中使用`ENV`指令设置环境变量
```dockerfile
ENV FLASK_APP=hello
```
这将会设置程序后续要用到的环境变量。样例中使用的flask框架使用了这个变量以启动程序
如果没有这个变量flask则不知道可运行程序的位置

#### 暴露接口
`EXPOSE`指令标记最终镜像有一个监听`8080`端口的服务。
```dockerfile
EXPOSE 8080
```
这条指令并不是必须的但这是一个好的时间并帮助工具及其他成员明白这个程序所作的工作

#### 启动程序
最终，`CMD`指令设置了当用户启动了基于这个镜像的容器时被执行的命令。
```dockerfile
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8080"]
```
这条命令启动了flask监听所有地址`8080`端口的开发服务器。这里的样例使用了"exec form"
版本的`CMD`指令。另一种则是使用"shell form"版本：
```dockerfile
CMD flask run --host 0.0.0.0 --port 8080
```
这两个版本有些微妙的区别，比如它们捕获如`SIGTERM`及`SIGKILL`的方式。更多的信息
查阅[Shell and exec form](https://docs.docker.com/reference/dockerfile/#shell-and-exec-form)

### 构建
使用前面的Dockerfile样例文件构建容器镜像需要使用`docker build`命令
```bash
docker build -t test:latest .
```
`-t test:latest`选项指定了镜像的名称和标签。命令末尾的`.`符号设置当前目录为构建
上下文。这意味着构建工作将会期望在命令被调用的当前目录查找Dockerfile及`hello.py`
文件。如果这写文件不在当前目录则会导致构建工作失败。
在镜像被构建之后就可以使用`docker run`命令将程序作为容器运行了，使用命令：
```bash
docker run -p 127.0.0.1:8080:8080 test:latest
```
这将会将容器的8080端口发布到docker宿主机的`http://127.0.0.1:8080`
> 在vscode上用[Docker VS Code Extension(Beta)](https://marketplace.visualstudio.com/items?itemName=docker.docker)编写dockerfile有更好的体验哦
> fucking vscode
























