//百度云盘  服务器版
sudo docker docker run -d -p 5901:5901 -v /path/to/download:/home/baidu/baidunetdiskdownload/ johnshine/baidunetdisk-crossover-vnc:latest



sudo docker run -d -p 6080:6080 -v /path/to/download:/home/baidu/baidunetdiskdownload/ --name=baiduyun johnshine/baidunetdisk-crossover-vnc:latest