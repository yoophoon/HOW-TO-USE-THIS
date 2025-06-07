# vim配置文件根目录
$VIMCONF_PATH="$HOME\vimfiles"

# 如果目录存在则移除这个目录
if (Test-Path -Path $VIMCONF_PATH) {
  Remove-Item -Path $VIMCONF_PATH -Recurse -Force
}
# 创建一个新的配置文件根目录
New-Item -Path $VIMCONF_PATH -ItemType Directory

# 获取当前脚本所在目录的文件及文件夹, 并创建对应链接
$items=Get-ChildItem -Path $PSScriptRoot
foreach($item in $items){
  $link=Join-Path -Path $VIMCONF_PATH -ChildPath $item.name
  if($item.PSIsContainer){
    cmd /c mklink /D "$link" "$($item.FullName)"
  }else{
    cmd /c mklink "$link" "$($item.FullName)"
  }
}
