# 兼容设置mintty的环境变量
# export PATH=/usr/local/bin:/usr/bin:$PATH
USR_LOCAL_BIN="/usr/local/bin"
USR_BIN="/usr/bin"
if [[ ":$PATH:" != *":$USR_BIN:"* ]]; then
  export PATH=$USR_BIN:$PATH
fi

if [[ ":$PATH:" != *":$USR_LOCAL_BIN:"* ]]; then
  export PATH=$USR_LOCAL_BIN:$PATH
fi


# [自定义 Bash 提示符显示 Git 分支](https://blog.csdn.net/qq_46392823/article/details/141673587)
function git_branch {
  branch="`git branch 2>/dev/null | grep "^\*" | sed -e "s/^\*\ //"`"
  if [ "${branch}" != "" ];then
    if [ "${branch}" = "(no branch)" ];then
      branch="(`git rev-parse --short HEAD`...)"
    fi
    echo "($branch)"
  fi
}
# 处理文件路径挂载的问题
function get_win_dir {

}
# 定义颜色
COLOR_USER_NAME="\[\033[01;33m\]"
COLOR_AT="\[\033[01;32m\]"
COLOR_HOST_NAME="\[\033[01;35m\]"
COLOR_PATH="\[\033[01;36m\]"
COLOR_BRANCH="\[\033[01;32m\]"
COLOR_DEFAULT="\[\033[00m\]"
export PS1="${COLOR_USER_NAME}\u${COLOR_AT}@${COLOR_HOST_NAME}\h ${COLOR_PATH}\w\[\033[01;32m\]$(git_branch)${COLOR_DEFAULT}\n\$"