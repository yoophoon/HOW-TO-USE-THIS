# 服务端的书籍
docker run -d \
  --name=calibre-web \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e DOCKER_MODS=linuxserver/mods:universal-calibre `#optional` \
  -e OAUTHLIB_RELAX_TOKEN_SCOPE=1 `#optional` \
  -p 8083:8083 \
  -v /path/to/calibre/data:/config \
  -v /path/to/calibre/library:/books \
  --restart unless-stopped \
  lscr.io/linuxserver/calibre-web:latest

> 同文件夹下的数据库文件需要拷贝到配置文件夹下
