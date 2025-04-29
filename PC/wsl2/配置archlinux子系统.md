[官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/)
[]

[子系统实际文件存放位置](https://learn.microsoft.com/zh-cn/windows/wsl/disk-space#how-to-locate-the-vhdx-file-and-disk-path-for-your-linux-distribution)


默认用户
/etc/wsl.confg
[user]
default=username

/etc/resolve.conf   windows与WSL2通信使用的虚拟网卡地址

## [配置文件](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#experimental-settings)
```bash
[wsl2]
memory=1GB  #限制wsl内存占用1G
[experimental]
autoMemoryReclaim=gradual  #缓慢释放缓存
sparseVhd=true
