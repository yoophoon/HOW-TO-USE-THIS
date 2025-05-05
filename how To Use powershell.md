# 更改默认起始位置
1、`echo "Set-Location defaultPath" > $Profile`   //将默认路径添加到PowerShell的配置文件中
>Profile是PowerShell的默认属性文件  
>路劲为 **C:\Users\UserName\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1**  

2、系统禁止运行脚本
管理员启动PowerShell执行命令`set-executionpolicy remotesigned` 选择是  **Y** 即可  

# 更改PowerShell的字符编码
`$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8nobom'`    //设置字符集为UTF-8  
`$PSDefaultParameterValues['*:Encoding'] = 'utf8'`                //更改具有 Encoding 参数的所有 cmdlet 的默认编码  
修改windows的系统设置 `控制面板\区域\管理\更改系统区域设置\` 勾选 使用Unicode UTF-8 提供全球语言支持
常见字符集:`chcp 936 GBK`和`chcp 65001 utf-8`                     //chcp 65001  

# 调用本地程序并获取相关信息
$p = Start-Process "./montage.exe" -ArgumentList "-background '#336699' -geometry +4+4 mpv-shot0001.jpg mpv-shot0002.jpg montage.jpg" -PassThru

$p.ExitCode
$p.HasExited
