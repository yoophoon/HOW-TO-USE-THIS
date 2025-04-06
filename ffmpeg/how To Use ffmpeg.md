`ffprobe -i input.mp4 -show_format`查看输入文件的视频信息

`ffmpeg.exe -i inputfile -vn -c:a format outputfile`
format copy|mp3

从视频文件分离音频文件
```powershell
foreach ($file in Get-ChildItem -Name -Include *.flv) { 
    $newName=$file.SubString(11,$file.Length-11)+'.aac'
    ./ffmpeg.exe -i $file -vn -c:a copy $newName
}
```
重命名
```powershell
ls "D:\Desktop\test" -i *.txt -r | foreach {
	ren $_.FullName $_.FullName.Replace("oldname", "newname")
}
```