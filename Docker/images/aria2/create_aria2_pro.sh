# aria2套件采用[p3terx/aria2-pro](https://hub.docker.com/r/p3terx/aria2-pro)
sudo docker run -d \
  --name aria2-pro \
  --log-opt max-size=1m \
  -e PUID=$UID \
  -e PGID=$GID \
  -e RPC_SECRET=yoophoon \
  -e RPC_PORT=6800 \
  -p 6800:6800 \
  -e LISTEN_PORT=6888 \
  -p 6888:6888 \
  -p 6888:6888/udp \
  -v /home/yoophoon/.config/aria2:/config \
  -v /mnt/c/Users/yoophoon/Downloads:/downloads \
  p3terx/aria2-pro

sudo docker run -d \
  --name ariang \
  --log-opt max-size=1m \
  -p 6880:6880 \
  p3terx/ariang

## 碰见的问题
### aria2无法下载[P3TERX/aria2.conf](https://github.com/P3TERX/aria2.conf)文件
  # 因为aria2的配置文件目录层级与仓库目录层级不一致,
  # 首次安装可通过给容器添加下面参数启用proxy, 待配置文件下载完毕后再移除容器, 
  # 移除下列参数后再创建容器, 后续即可使用之前下载好的配置文件
  # ./aria2conf 为配置文件备份, 有必要时将该文件夹内容复制到aria2的配置文件目录
#  -e HTTP_PROXY=http://172.20.224.1:7890/ \
#  -e HTTPS_PROXY=http://172.20.224.1:7890/ \
#  -e NO_PROXY=localhost,127.0.0.1 \

## 一些说明: 
  # [p3terx/aria2-pro]已经很长时间没更新了
  # [wahyd4/aria2-ui](https://hub.docker.com/r/wahyd4/aria2-ui)在持续更新
