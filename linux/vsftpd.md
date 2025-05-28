# 安装
`pacman -S vsftpd`
# 启动
`systemctl start vsftpd`
# 配置
`vim /etc/vsftpd.conf`
- 启用本地账户登入 : local_enable=YES
- 允许用户上传文件 : write_enable=YES
