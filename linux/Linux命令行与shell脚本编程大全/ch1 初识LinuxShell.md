# 一些术语
通配符匹配   globbing
通配符      wildcard
进程列表    p114  $BASH_SUBSHELL显示子 Shell 的嵌套深度，调用脚本、使用括号 () 、{command;} 或启动子进程都会增加该值
命令分组    command grouping
协程        coproc
衍生        forking
外部命令&内建命令 type type # type查看自身的命令类型 (type命令本身就用于显示命令信息)  which则是显示PATH中的命令路径
!! 应该在bash中被自动替换为上一条执行的命令 type !! 查询的是上一条命令  正常调用则是换回命令并执行该命令
!n  类似于!! 调用history中的第n条命令

环境变量  
printenv env

设置局部变量 var_name=value   # 存在空格则需要将变量值用 '' "" 包裹变量值

设置全局变量 export var_name  # man export

数组变量  
- 定义 var_name=(var1 var2 var3)   
- 引用 echo ${var_name[0]}  #应用仍与其他语言一样 引用全部元素 echo ${var_name[*]}
- 修改元素  var_name[0]=var4
- 删除元素  unset var_name[0] #删除元素只是将其值置空 并不会将剩余索引左移

# 文件权限
## 文件模式
属主|属组|其他  
- 都是控制rwx即读写执行，linux默认给文件的权限为666，给文件夹的权限为777
- 用户创建的文件权限为  default & ~ umask 权限
  - 如，系统默认umask为 022 顾文件权限  umask 000|010|010   文件夹权限  umask  000|010|010
                                       ~umask 111|101|101              ~umask  111|101|101
                                      default 110|110|110             default  111|111|111
                                     最终权限 110|100|100            最终权限  111|101|101
                                     即       rw- r-- r--            即        rwx r-x r-w

umask: 设置或显示文件权限掩码
- archlinux 的默认设置为 022 @ /etc/login.defs

权限位：文件权限由4位8进制数组成即权限位、属主位、属组位、其他位，
而修改文件权限只需要1~4位八进制数就行，系统默认会补足前置零
- 权限位的的比特位  第一位为文件执行      是否采用属主权限
                    第二位为文件执行      是否采用属组权限 文件夹内新建是否将当前属组作为默认属组
                    第三位为粘滞位        是否只能由属组删除或重命名文件夹内文件

## 文件系统管理和软件安装跳过
## 
## 脚本
默认的shell环境变量 p133

login shell       p138
- 默认文件是 /etc/profile
