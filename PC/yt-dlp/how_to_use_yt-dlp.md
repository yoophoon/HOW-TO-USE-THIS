# 使用方法
## 输出样例模板
[样例](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#output-template-examples)
## 获取信息
-F,--list-format
    列出所有可用的格式
## 指定下载格式
-f,--format FORMAT
[FORMAT SELECTION](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#format-selection)

# 错误处理
1. youtube验证机器人
```error info
ERROR: [youtube] zKOZJptt3rg: Sign in to confirm you’re not a bot. Use --cookies-from-browser or --cookies for the authentication. See  https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp  for how to manually pass cookies. Also see  https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies  for tips on effectively exporting YouTube cookies
```
- 尝试获取浏览器cookies, 但存在无法复制及解密失败的错误, 顾放弃该方法
- 通过浏览器插件Get cookies.txt LOCALLY导出指定网站cookies, 然后使用`--cookies cookies.txt`选项可成功通过验证
相关链接: 
    [cookies解密失败](https://github.com/yt-dlp/yt-dlp/issues/10927)
