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



默认的shell环境变量 p133

login shell       p138
- 默认文件是 /etc/profile
