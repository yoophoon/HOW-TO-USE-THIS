docker run -d -p 1066:1066 \
            -e TZ=Asia/Shanghai \
            -v /path/to/e5re:/app \
            --name e5re \
            --restart=always \
            hanhongyong/ms365-e5-renew-x:latest