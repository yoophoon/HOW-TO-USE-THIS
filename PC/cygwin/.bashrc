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
# 设置git分支信息
function git_branch {
  if $(git rev-parse --is-inside-work-tree 2>/dev/null);then
    branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    [ ! -z "${branch}" ]&&echo "($branch)"
    # if [ "${branch}" != "" ];then
    #   echo "($branch)"
    # fi
  else
    echo ""
  fi
}
# 处理文件路径挂载的问题
function get_win_dir {
  if [[ $(pwd) == "/cygdrive/"* ]];then
    echo $(pwd|cut -d'/' -f3-)
  elif [[ $(pwd) == ~ ]];then
    echo "~"
  else
    echo "c/cygwin64$(pwd)"
  fi
}

# 首次加载计算完毕
COLOR_USER_NAME="\[\033[01;33m\]"
COLOR_AT="\[\033[01;32m\]"
COLOR_HOST_NAME="\[\033[01;35m\]"
COLOR_PATH="\[\033[01;36m\]"
COLOR_BRANCH="\[\033[01;32m\]"
COLOR_DEFAULT="\[\033[00m\]"
FORMATTED_PS1="${COLOR_USER_NAME}\u${COLOR_AT}@${COLOR_HOST_NAME}\h ${COLOR_PATH}"
NEW_LINE="${COLOR_DEFAULT}\n\$"
# 每次进入都要动态计算 
PROMPT_COMMAND='PS1="${FORMATTED_PS1}$(get_win_dir)${COLOR_BRANCH}$(git_branch)${NEW_LINE}"'