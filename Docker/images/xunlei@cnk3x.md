# 迅雷服务器版

```s
docker run -d \
--name=xunlei \
--hostname=mynas \
--net=host \
-p 2345:2345 \
-v /path/to/xunlei:/xunlei/data \
-v /path/to/downloads:/xunlei/downloads \
--restart=unless-stopped \
--privileged cnk3x/xunlei:latest
```
