# [nginx](https://github.com/nginx/nginx)
## 后续有空系统学习下
## 配置
### 实现域名解析
```/etc/nginx/nginx.conf
    server {
        listen       80;
        server_name  aria2.local.com;

        location / {
            proxy_pass http://172.20.233.112:6880;
        }
    }
```
