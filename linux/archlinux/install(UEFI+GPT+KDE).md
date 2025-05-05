# [Archlinux安装指引](https://wiki.archlinux.org/title/Installation_guide)
## 安装之前
1. 下载[Archlinux系统镜像](https://archlinux.org/download/)
2. 验证签名
- 在安装*GnuPG*软件的系统上执行`gpg --keyserver-options auto-key-retrieve --verify archlinux-version-x86_64.iso.sig`
- 在Archlinux上执行`pacman-key -y archlinux-version-x86-64.iso.sig`
> 签名验证需要镜像的签名和签名的镜像在同一目录然后执行上面命令，简单一点的验证
> 可以使用sha256验证，archlinux自带工具`sha256sum`，执行下面命令即可：
> `sha256sum archlinux-version-x86_64.iso`，查看输出是否与网站`sha256`一致
> 这里是严谨的安全校验，一般用户可以忽略
3. 准备安装媒介
- [rufus](https://github.com/pbatard/rufus)是一款很好的工具
4. 启动安装环境
一般在bios里面设置开机系统就行，archwiki介绍的很官方很详细，有兴趣可以阅读
5. 设置控制台键盘布局和字体
默认的键盘为`US`(美式键盘)，一般默认就行，也可以通过下面命令查询可用键盘布局:
`# localectl list-keymaps`
设置键盘布局:
`# loadkeys de-latin1`
控制台字体在`/usr/share/kbd/consolefonts/`目录，通过`setfont`命令设置字体时可以
忽略路径和扩展名，如为高分辨率屏幕指定最大号字体:
`# setfont ter-132b`
6. 验证开机模式
检查UEFI比特位来验证开机模式：`# cat /sys/firmware/efi/fw_platform_size`
- 如果命令输出`64`，系统则以UEFI模式开机且为64-bit x64 UEFI
- 如果命令输出`32`，系统则以UEFI模式开机且位32-bit IA32 UEFI。当电脑支持这个模
式时会限制开机加载选项为支持混合开机模式的选项
- 如果命令输出`不存在相关文件或目录`，系统可能是以`BIOS`或`CSM`模式开机的
7. 连接网络
通过一下步骤在安装环境中创建网络连接：
- 确保网络接口可使用且可见，使用`ip link`命令查看：`# ip link`
- 对于无线网络，确保网卡没有被`rfkill`命令禁止(radio frequency kill)
- 连接到网络：
    + 以太网：插入网线
    + WI-FI：使用`iwctl`验证无线网络
    > iwctl:internet wireless ctl(control)
    + 移动宽带调制解调器：使用`mmcli`工具接入移动网络
    > 移动宽带调制解调器：mobile broadband modem
    > mmcli:modem manager CLI
- 配置网络连接
    + DHCP：动态IP地址和DNS服务器分配应该能满足以太网、无线网和移动宽带
    > DHCP: dynamic host configuration protocol即动态主机配置协议
    + 静态IP地址：查阅[网络配置](https://wiki.archlinux.org/title/Network_configuration#Static_IP_address)
- 使用`ping`验证网络可用性：`# ping archlinux.org`
8 更新系统时间
安装环境在联网时会自动同步网络时间，可以通过`timedatectl`命令验证时间同步情况:
`# timedatectl`
9 磁盘分区
当磁盘被安装环境识别之后会被当作[块设备](https://wiki.archlinux.org/title/Device_file#Block_devices)如`/dev/sda`,`/dev/nvm0n1`或者`/dev/mmcblk0`。可以通
`lsblk`或`fdisk`命令查看这些设备：`# fdisk -l`。以`rom`,`loop`或`airootfs`结尾
的输出可以忽略。以`rpbm`,`boot0`及`boot1`结尾的`mmcblk*`设备也可以忽略。
选中的设备必须要存在下列的分区：
- 用于根目录`/`的分区
- 用于UEFI开机的EFI系统分区
使用分区工具比如fdisk修改分区表。例如：`# fdisk /dev/the_disk_to_be_partitioned`
9.1 [样例布局](https://wiki.archlinux.org/title/Installation_guide#Example_layouts)
10 格式化分区
UEFI模式启动时如果将根分区设为fat格式，安装系统的时候会出现无法识别参数的错误,
查了一圈没有准确的答案，可能的问题是该格式下某些文件路径无法被程序识别。
10.1 UEFI启动模式分区格式
- boot分区需要采用fat格式，否则grub安装系统引导出错
- 根分区需要采用ext4格式，否则出现`错误参数`错误
- swap分区只尝试过ext4格式，暂未发现问题
10.2 BIOS启动模式分区格式

11 挂载分区
因为boot分区为根分区的一部分，所以要先挂载根分区，然后在根分区内创建boot文件夹
用于挂载boot分区，最后挂载swap分区。
- `# mount /dev/root_partition /mnt`
- `# mkdir /mnt/boot`
- `# mount /dev/boot_partition /mnt/boot`
- `# swapon /dev/swap_partition`
## 系统安装
前面的11个步骤很全面的解释安装前的准备工作，但系统安装并未正式开始，从这开始才
进入系统安装截断。
1. 选择镜像
软件包仓库镜像服务器列表存放在`/etc/pacman.d/mirrorlist`文件，可以使用
`# reflector --country China --latest 10 --sort rate --save /etc/pacman.d/mirrorlist`
命令将国内速度最快的10个镜像站写入mirrorlist文件
> `/etc/pacman.d/mirrorlist`就是镜像服务器列表，这与`/etc/pacman.conf`有点区别
> 安装环境的`mirrorlist`会被自动复制到被安装的系统中去，也只有这个文件是这样
2. 安装必要的包
使用`pacstrap`脚本安装基础包、linux内核以及通用硬件的firmware：
`# pacstrap -K /mnt base linux linux-firmware`
当然可以在后面继续追加想用的软件包名
3. 配置系统
- 使用`genfstab`命令为系统生成fstab文件：`# genfstab /mnt >> /mnt/etc/fstab`
- chroot到新系统：`# arch-chroot /mnt`
- 设置时区：`# ls -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`
- 使用`hwclock`命令生成硬件时钟文件`/etc/adjtime`:`# hwclock --systohc`
- 本地化
    + 编辑`/etc/local.gen`文件进行本地化语言生成配置
    + 执行`local-gen`命令生成本地化文件
    + 编辑`/etc/locale.conf`文件设置系统默认本地化语言，如`LANG=zh_CN.UTF-8`
    + [可选]编辑`/etc/vconsole.conf`设置键盘布局，如`KEYMAP=en`
- 网络配置
    + 创建主机名称文件，如`# echo "ArchBravo" >> /etc/hostname`
    + 如需其他网络配置查阅[网络配置](https://wiki.archlinux.org/title/Network_configuration)及[网络管理](https://wiki.archlinux.org/title/Network_configuration#Network_management)
- **设置密码**，这很重要，不要重启之后还要进行特殊操作
- 开机引导
    + [grub](https://wiki.archlinux.org/title/GRUB)
## 重启电脑
1. 退出chroot，输入`exit`或`CTRL-d`
2. [可选]卸载磁盘，umount -R /mnt
3. 重启`reboot`
## 完成安装
- [通用建议](https://wiki.archlinux.org/title/General_recommendations)
- [软件列表](https://wiki.archlinux.org/title/List_of_applications)
至此，一个最基本的archlinux系统就安装完成了

# 一些概念
## [pacman](https://wiki.archlinux.org/title/Pacman)
archlinux的具有识别度的包管理器
## package scurity
### [archlinux-keyring](https://gitlab.archlinux.org/archlinux/archlinux-keyring/)
archlinux的软件包，用于验证软件的PGP签名
### [pacman-key](https://wiki.archlinux.org/title/Pacman/Package_signing)
archlinux的root工具，用于管理软件的签名



                                                                                
                                                                                








# [Archlinux Install(UEFI+GPT+KDE)](https://www.bilibili.com/video/av898108481/)
1. 停止reflector服务 禁止自动更新服务器列表
> systemctl stop reflector.service

2. 连接网络  
- 有线连接  
> 若是连接到已经有网的路由器可以自动联网  

- 无线连接  
ping 一下某个网站 看看是否连接成功  
```sh
iwctl                               #执行iwctl命令，进入交互式命令行
device list                         #列出设备名，比如无线网卡看到叫 wlan0
station wlan0 scan                  #用wlan0网卡扫描网络
station wlan0 get-networks          #列出网络
station wlan0 connect 无线网名字    #连接网络名字 输入密码
exit                                #(quit)成功后退出
```

3. 时间设置  
同步网络时间`timedatectl set-ntp true`
4. 修改软件源  
把中国的服务器排在前列`nano /etc/pacman.d/mirrorlist`
5. 安装SSH工具  
```sh
pacman -Syyu刷新但是不要更新软件包
pacman -S openssh安装ssh远程软件
systemctl start sshd启用sshd服务
passwd设置当前root账户的密码
ip a查看ip地址
```
使用SSH软件连接
填入之前查看的ip地址和账户名root 输入密码即可连接成功
之后的步骤都可以在SSH上完成 不用繁琐的敲命令 可以复制粘贴  
6. 磁盘分区、格式化及挂载  
- 分区
```sh
fdisk -l 查看磁盘列表
fdisk /dev/sda
分区sda磁盘

fdisk磁盘操作手册
m 帮助
g 小写g创建gpt格式磁盘
n 创建分区
p 查看分区
w 保存并退出 所有的操作没有执行w前都不会生效
#第1个分区 序号1 分配大小+512M 作为ESP启动分区
#第2个分区 序号2 分配大小+4G 作为swap交换分区
#第3个分区 序号3 分配大小+30G 作为/根目录
#第4个分区 序号4 一路回车剩余空间都给它 作为/home目录
```
- 格式化
```sh 
mkfs.vfat /dev/sda1 # 或者mkfs.fat -F32 /dev/sda1
mkswap /dev/sda2
mkfs.ext4 /dev/sda3
mkfs.ext4 /dev/sda4
swapon /dev/sda2
```
- 挂载  
```sh
#必须先挂载根目录 才能挂载其他目录
mount /dev/sda3 /mnt
mkdir /mnt/home
mkdir /mnt/boot
mount /dev/sda4 /mnt/home
mount /dev/sda1 /mnt/boot
```
7. 系统安装  
往/mnt目录里安装系统，其中最基础的四个包是base base-devel linux linux-firmware  
`pacstrap /mnt base base-devel linux linux-firmware dhcpcd iwd vim sudo bash-completion nano net-tools openssh man git wget zsh fish`
- 持久化硬盘挂载  
```sh
##生成fstab
genfstab -U /mnt >> /mnt/etc/fstab
##查看fstab 若正确则进行下一步
cat /mnt/etc/fstab
```
- 系统配置
```sh
#从当前的live环境切换到刚安装的系统内
arch-chroot /mnt
#编辑hostname 名字自行取名 如arch 填入里面
nano /etc/hostname
#编辑hosts 我这里的名字是arch可自行更改
nano /etc/hosts
#内容如下
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch
#设置时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
#硬件时间设置
hwclock --systohc
# 本地化设置
#编辑语言环境
nano /etc/locale.gen  # 这个文件用于locale-gen命令  用于生成本地语言信息
#ctrl+w搜索en_US注意大小写
#alt+w搜索下一个 找到en_US.UTF-8.UTF-8
en_US.UTF-8.UTF-8 #前面的#号删除
#ctrl+x  按y 再回车保存退出
#使刚才编辑的语言环境生效
locale-gen  # 这个命令将会在 /usr/lib/locale/目录中生成locale-archive文件
# /etc/locale.conf  这个文件才是配置系统的语言的
#*往/etc目录下的locale.conf文件里写入如下内容*
#*LANG=en_US.UTF-8*
#*相当于nano /etc/locale.conf*
#*里面输入LANG=en_US.UTF-8*
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
#直接设置系统语言
localectl set-locale LANG=zh_CN.UTF-8
# pacman的配置文件
/etc/pacman.d/mirrorlist  定义Archlinux软件仓库的镜像地址，影响pacman下载软件包的服务器，值越靠前优先级越高
`sudo reflector --country China --latest 10 --sort rate --save /etc/pacman.d/mirrorlist`命令可以获取国内的下载速度前10的镜像站


/etc/pacman.conf  配置pacman的行为，包括软件数据库、缓存设置、颜色显示、签名验证等
这个文件也可以配置pacman的软件仓库
#编辑archlinuxcn中国源(可选项  非必须  也可以在安装完之后 进入桌面再编辑)

nano /etc/pacman.conf
#ctrl+w 搜索Color注意大小写 删除#号
#系统报错会彩色显示 方便用户排查
#[multilib]这两行前面的#号删除
#再手动添加[archlinuxcn]源
#我这里以中科大和网易开源镜像站为例
#其他地址 如清华 阿里云 或者你所在的高校有archlinuxcn源 可以自行添加
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = http://mirrors.163.com/archlinux-cn/$arch
#添加源之后更新系统并安装archlinuxcn-keyring
pacman -Syu && pacman -S archlinuxcn-keyring
#安装玩密钥环之后更新系统密钥
pacman-key --refresh-keys
#ctrl+x  按y 再回车保存退出

#设置root密码
passwd root   #*当前账户就是root 可以不用打root*
#新建用户名arch 可自行更改用户名
useradd -m -G wheel -s /bin/bash arch
#设置arch用户名的密码
passwd arch
#编辑arch用户的权限
EDITOR=nano visudo

#ctrl+w搜索%wheel
#找到# %wheel ALL=(ALL:ALL)ALL
#删除前面的#号
#ctrl+x  按y 再回车保存退出

#安装 cpu微码和引导软件
pacman -S amd-ucode grub efibootmgr os-prober
#//如果是intel的cpu 则输入intel-ucode
#//os-prober查找已安装的操作系统 推荐实体机上安装
#安装grub引导
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
#说明
##grub-install *安装grub*
##--target=x86_64-efi      *目标架构x86架构64位 efi启动方式  若不确定使用uname -a 可以查看*
##--efi-directory=/boot      *就是我sda1挂载的/boot位置*
##--bootloader-id=GRUB     *这里的GRUB名字可以自行更改 甚至这一段都可以不用写*
#生成grub
grub-mkconfig -o /boot/grub/grub.cfg
```
- 桌面安装  
```sh
#安装KDE桌面 字体 浏览器等软件包
pacman -S plasma konsole dolphin     *kde桌面和终端，文件管理器*
pacman -S ntfs-3g          *可以读取ntfs格式磁盘 实体机上推荐安装*
pacman -S os-prober     *查找已安装的操作系统 实体机上推荐安装*
pacman -S adobe-source-han-serif-cn-fonts adobe-source-han-sans-cn-fonts wqy-zenhei wqy-microhei noto-fonts-cjk noto-fonts-emoji noto-fonts-extra ttf-dejavu  
#*中文字体 这里如果不安装 之后设置语言的时候都是框框不好辨认*
pacman -S firefox ark gwenview packagekit-qt5 packagekit appstream-qt appstream man neofetch net-tools networkmanager openssh git wget
#这里安装的软件包只适用于vmware虚拟机
pacman -S gtkmm gtk2 gtkmm3 open-vm-tools xf86-input-vmmouse xf86-video-vmware
#*vmware虚拟机的自适应分辨率*
#开机启动 显示管理器 网络管理 ssh 虚拟机自适应分辨率 注意大小写
systemctl enable NetworkManager sddm vmtoolsd sshd
#*vmware虚拟机刚才安装了vmware的软件包才能启动vmtoolsd进程*

#编辑文件
nano /etc/mkinitcpio.conf
MODULES=(vsock vmw_vsock_vmci_transport vmw_balloon vmw_vmci vmwgfx)
#ctrl+x  按y 再回车保存退出

#运行以下命令 使刚才编辑的配置文件生效
mkinitcpio -p linux

#启动时候的live环境 分区后 挂载了本机的磁盘
#又使用arch-chroot /mnt命令从live环境切换到刚安装的系统内

#现在已经安装完成 要退回到启动时候的live环境
#exit或者ctrl+d

#卸载本机的/mnt目录
umount -R /mnt
#重启
reboot

#输入密码登录进桌面环境
#更改KDE中文界面
#安装aur助手 前提是开启aur中国源nano /etc/pacman.conf
pacman -S archlinuxcn-keyring
#如果报错则执行以下命令
rm -rf /etc/pacman.d/gnupg     #*rm命令谨慎操作*
pacman-key --init
pacman-key --populate archlinux
pacman-key --populate archlinuxcn
pacman -S yay paru
#yay paru都是aur助手 任选一种 还有其他的aur助手软件可以自行搜索
#安装aur中国源软件库里面的软件 以网易云为例
yay -S netease-cloud-music   #或者paru -S netease-cloud-music
#安装fcitx5输入法
pacman -S fcitx5-im fcitx5-chinese-addons fcitx5-pinyin-moegirl fcitx5-pinyin-zhwiki fcitx5-material-color
#编辑运行环境 使fcitx5输入法生效
EDITOR=nano sudoedit /etc/environment
#输入以下内容
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

