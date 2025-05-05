$VIMCONF_PATH="$HOME\vimfiles"

if (Test-Path -Path $VIMCONF_PATH) {
  Remove-Item -Path $VIMCONF_PATH -Recurse -Force
  New-Item -Path $VIMCONF_PATH -ItemType Directory
} else {
  New-Item -Path $VIMCONF_PATH -ItemType Directory
}

$items=Get-ChildItem -Path $PSScriptRoot
foreach($item in $items){
  $link=Join-Path -Path $VIMCONF_PATH -ChildPath $item.name
  if($item.PSIsContainer){
    cmd /c mklink /D "$link" "$($item.FullName)"
  }else{
    cmd /c mklink "$link" "$($item.FullName)"
  }
}
