# quick run
docker run -d --name aria2-ui -p 80:80 wahyd4/aria2-ui
# Filebrowser:admin/admin
# Rclone:user/password
#
docker run -d --name ariang \
  -p 80:80 \
  -p 443:443 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e ENABLE_AUTH=true \
  -e RPC_SECRET=2420074212@qq.com \
  -e ARIA2_SSL=false \
  -e ARIA2_USER=user \
  -e ARIA2_PWD=password \
  -e ARIA2_EXTERNAL_PORT=443 \
  -e CADDY_LOG_LEVEL=ERROR \
  -v /home/yoophoon/Downloads:/data \
  -v /home/yoophoon/.config/aria2/conf:/app/conf \
  -v /home/yoophoon/.config/aria2/conf/key:/app/conf/key \
  -v /home/yoophoon/.config/aria2/filebrowser.db:/app/filebrowser.db \
  -v /home/yoophoon/.config/aria2/.cache:/app/.cache \
  --restart unless-stopped \
  wahyd4/aria2-ui
#this can run a fully container of ariang
#but those file needs copy from this container
#run docker exec -it container bash and copy those files
#


docker run -d --name ariang \
  -p 80:80 \
  -p 443:443 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e ENABLE_AUTH=true \
  -e RPC_SECRET=Hello \
  -e ARIA2_SSL=false \
  -e ARIA2_USER=user \
  -e ARIA2_PWD=password \
  -e ARIA2_EXTERNAL_PORT=443 \
  -e CADDY_LOG_LEVEL=ERROR \
  -v /path/to/aria2Data:/data \
  -v /app/.cache:/app/.cache \
  -v /path/to/aria2conf:/app/conf \
  wahyd4/aria2-ui

docker run -d \
    --name aria2-pro \
    --restart unless-stopped \
    --log-opt max-size=1m \
    -e PUID=$UID \
    -e PGID=$GID \
    -e UMASK_SET=022 \
    -e RPC_SECRET=yoophoon \
    -e RPC_PORT=6800 \
    -p 6800:6800 \
    -e LISTEN_PORT=6888 \
    -p 6888:6888 \
    -p 6888:6888/udp \
    -v $PWD/aria2-config:/config \
    -v $PWD/Downloads:/downloads \
    p3terx/aria2-pro