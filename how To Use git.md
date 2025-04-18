
- [1. 下载git](#1-下载git)
- [2. 配置ssh密钥](#2-配置ssh密钥)
- [3. 配置git](#3-配置git)
- [4. 在gitee里面设置公钥](#4-在gitee里面设置公钥)
- [5. 查看项目状态](#5-查看项目状态)
- [6. 提交项目](#6-提交项目)
- [7. 已有空库，推送项目上去](#7-已有空库推送项目上去)
- [8. 分支相关](#8-分支相关)
- [9. 查看当前文件夹的仓库](#9-查看当前文件夹的仓库)
- [10. 克隆仓库到非空文件夹](#10-克隆仓库到非空文件夹)
- [11. 克隆项目](#11-克隆项目)

### 1. 下载git

---

### 2. 配置ssh密钥
`ssh-keygen -t rsa -C 'email'` // 根据邮箱生成公钥

---
### 3. 配置git
`git config --global user.name` '用户名'   
`git config --global user.email` 'email'  
`git config --list`   //查看git的配置信息  

---
### 4. 在gitee里面设置公钥
gitee→设置→安全设置→ssh公钥
将第2步生成的公钥复制到gitee
测试设置状态
ssh -T git@github.com
```powershell
#验证成功
PS D:\Github\how-to-use-this> ssh -T git@github.com
Hi yoophoon! You've successfully authenticated, but GitHub does not provide shell access.
```

---
### 5. 查看项目状态
```powershell
git status  
cat ./.git/config  
#效果类似于 git config --list
git add 
```

---
### 6. 提交项目
git commit -m "comment" //提交  附带信息

---
### 7. 已有空库，推送项目上去  
`git init` //初始化仓库  
github取消了https的验证方式  
`git remote rm origin` //移除origin远程仓库  
`git remote add origin` "仓库地址"  //添加远程仓库  
`git push --set-upstream origin master` //首次推送设置
`git push -u origin` "仓库分支"  //推送 推送地址 推送分支  

### 8. 分支相关  
`git checkout -b "newBranch"` 在创建``newBranch分支并切换到新分支  
上面命令实际是下面命令的简化版  
`git branch "newBranch"`  
`git checkout "newBranch"`    
### 9. 查看当前文件夹的仓库  
`git remote -v` //显示拉取、推送的地址  
`git remote show origin` //显示更多的信息  

### 10. 克隆仓库到非空文件夹  
```powershell
#1、克隆仓库到任意文件夹
git clone --no-checkout https://git.oschina.NET/NextApp/platform.git anyFolder
#2、复制`.git`到目标非空文件夹
#3、设置git信息 注意查看仓库地址
git reset --hard HEAD
```


### 11. 克隆项目
`git clone` 仓库地址

## git的一些设置
### git代理设置
1. 设置代理
git config --global http.proxy http://127.0.0.1:8080
2. 取消代理
git config --global --unset http.proxy

### 取消换行符检查
git config --global core.autocrlf false

### 区分大小写
git config --global core.ignorecase false
