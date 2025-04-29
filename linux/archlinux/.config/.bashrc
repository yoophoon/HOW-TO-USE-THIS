# 非交互式环境直接退出
[[ "$-" != *i* ]] && return

# 确认系统平台
OS_PLATFORM=
if [[ -e /msys2.exe ]]; then
  OS_PLATFORM=true
fi
# alias here
alias ls='ls --color=auto'
alias ll='ls -l --color=auto'
alias la='ls -a --color=auto'
alias startproxy='export http_proxy=http://127.0.0.1:7890; export https_proxy=http://127.0.0.1:7890'
alias endproxy='unset http_proxy;unset https_proxy'


export LESS="-n"  # less命令的环境变量，查阅man less获取更多信息
# 这个选项会让有些命令无法正常运行，如 nvm ls-remote 会抛出未绑定变量名
# 在调试时启用该选项有用
#set -u    # 不允许引用未定义变量  unset 报错处理
#set -e    # 报错中断执行，这个设置应该放在脚本的第二行  exit 退出处理

# 后台任务运行结束直接打印结果
# set -o notify
#
# Don't use ^D to exit
# set -o ignoreeof
#
# Use case-insensitive filename globbing
# shopt -s nocaseglob
#
# Make bash append rather than overwrite the history on disk
# shopt -s histappend
#
# When changing directory small typos can be ignored by bash
# for example, cd /vr/lgo/apaache would find /var/log/apache
# shopt -s cdspell

# Completion options
#
# These completion tuning parameters change the default behavior of bash_completion:
#
# Define to access remotely checked-out files over passwordless ssh for CVS
# COMP_CVS_REMOTE=1
#
# Define to avoid stripping description in --option=description of './configure --help'
# COMP_CONFIGURE_HINTS=1
#
# Define to avoid flattening internal contents of tar files
# COMP_TAR_INTERNAL_PATHS=1
#
# Uncomment to turn on programmable completion enhancements.
# Any completions you add in ~/.bash_completion are sourced last.
# [[ -f /etc/bash_completion ]] && . /etc/bash_completion

# History Options
#
# Don't put duplicate lines in the history.
# export HISTCONTROL=$HISTCONTROL${HISTCONTROL+:}ignoredups
#
# Ignore some controlling instructions
# HISTIGNORE is a colon-delimited list of patterns which should be excluded.
# The '&' is a special pattern which suppresses duplicate entries.
# export HISTIGNORE=$'[ \t]*:&:[fb]g:exit'
# export HISTIGNORE=$'[ \t]*:&:[fb]g:exit:ls' # Ignore the ls command as well
#
# Whenever displaying the prompt, write the previous line to disk
# export PROMPT_COMMAND="history -a"

# Aliases
#
# Some people use a different file for aliases
# if [ -f "${HOME}/.bash_aliases" ]; then
#   source "${HOME}/.bash_aliases"
# fi
#
# Some example alias instructions
# If these are enabled they will be used instead of any instructions
# they may mask.  For example, alias rm='rm -i' will mask the rm
# application.  To override the alias instruction use a \ before, ie
# \rm will call the real rm not the alias.
#
# Interactive operation...
# alias rm='rm -i'
# alias cp='cp -i'
# alias mv='mv -i'
#
# Default to human readable figures
# alias df='df -h'
# alias du='du -h'
#
# Misc :)
# alias less='less -r'                          # raw control characters
# alias whence='type -a'                        # where, of a sort
# alias grep='grep --color'                     # show differences in colour
# alias egrep='egrep --color=auto'              # show differences in colour
# alias fgrep='fgrep --color=auto'              # show differences in colour
#
# Some shortcuts for different directory listings
# alias ls='ls -hF --color=tty'                 # classify files in colour
# alias dir='ls --color=auto --format=vertical'
# alias vdir='ls --color=auto --format=long'
# alias ll='ls -l'                              # long list
# alias la='ls -A'                              # all but . and ..
# alias l='ls -CF'                              #

# Umask
#
# /etc/profile sets 022, removing write perms to group + others.
# Set a more restrictive umask: i.e. no exec perms for others:
# umask 027
# Paranoid: neither group nor others have any perms:
# umask 077

# Functions
#
# Some people use a different file for functions
# if [ -f "${HOME}/.bash_functions" ]; then
#   source "${HOME}/.bash_functions"
# fi
#
# Some example functions:
#
# a) function settitle
# settitle () 
# { 
#   echo -ne "\e]2;$@\a\e]1;$@\a"; 
# }
# 
# b) function cd_func
# This function defines a 'cd' replacement function capable of keeping, 
# displaying and accessing history of visited directories, up to 10 entries.
# To use it, uncomment it, source this file and try 'cd --'.
# acd_func 1.0.5, 10-nov-2004
# Petar Marinov, http:/geocities.com/h2428, this is public domain
# cd_func ()
# {
#   local x2 the_new_dir adir index
#   local -i cnt
# 
#   if [[ $1 ==  "--" ]]; then
#     dirs -v
#     return 0
#   fi
# 
#   the_new_dir=$1
#   [[ -z $1 ]] && the_new_dir=$HOME
# 
#   if [[ ${the_new_dir:0:1} == '-' ]]; then
#     #
#     # Extract dir N from dirs
#     index=${the_new_dir:1}
#     [[ -z $index ]] && index=1
#     adir=$(dirs +$index)
#     [[ -z $adir ]] && return 1
#     the_new_dir=$adir
#   fi
# 
#   #
#   # '~' has to be substituted by ${HOME}
#   [[ ${the_new_dir:0:1} == '~' ]] && the_new_dir="${HOME}${the_new_dir:1}"
# 
#   #
#   # Now change to the new dir and add to the top of the stack
#   pushd "${the_new_dir}" > /dev/null
#   [[ $? -ne 0 ]] && return 1
#   the_new_dir=$(pwd)
# 
#   #
#   # Trim down everything beyond 11th entry
#   popd -n +11 2>/dev/null 1>/dev/null
# 
#   #
#   # Remove any other occurence of this dir, skipping the top of the stack
#   for ((cnt=1; cnt <= 10; cnt++)); do
#     x2=$(dirs +${cnt} 2>/dev/null)
#     [[ $? -ne 0 ]] && return 0
#     [[ ${x2:0:1} == '~' ]] && x2="${HOME}${x2:1}"
#     if [[ "${x2}" == "${the_new_dir}" ]]; then
#       popd -n +$cnt 2>/dev/null 1>/dev/null
#       cnt=cnt-1
#     fi
#   done
# 
#   return 0
# }
# 
# alias cd=cd_func
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
  elif [[ $(pwd) == "/mnt/c/"* ]];then
    echo $(pwd|cut -d'/' -f3-)
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

# nvm 
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm use会自动加载$HOME/.bashrc指定的node版本
# .bashrc的内容为node版本号 如 22.12.0
nvm use > /dev/null


#                ##     ##  ######  ##    ##  ######   #######                  
#                ###   ### ##    ##  ##  ##  ##    ## ##     ##                 
#                #### #### ##         ####   ##              ##                 
#                ## ### ##  ######     ##     ######   #######                  
#                ##     ##       ##    ##          ## ##                        
#                ##     ## ##    ##    ##    ##    ## ##                        
#                ##     ##  ######     ##     ######  #########                 
####     https://patorjk.com/software/taag/#p=display&f=Banner3&t=msys2     ####
#region msys2
if [[ -e /msys2.exe ]]; then
  # 启用msys2创建符号链接
  # [windows开启开发模式](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development)
  # [msys2使用链接](https://superuser.com/questions/550732/use-mklink-in-msys)
  # [msys2给windows文件夹创建符号链接](https://superuser.com/questions/1097481/msys2-create-a-sym-link-into-windows-folder-location/1756929#1756929)
  export MSYS=winsymlinks:nativestrict
fi
#endregion

#   ###    ########   ######  ##     ##    ##       #### ##    ## ##     ## ##     ## 
#  ## ##   ##     ## ##    ## ##     ##    ##        ##  ###   ## ##     ##  ##   ##  
# ##   ##  ##     ## ##       ##     ##    ##        ##  ####  ## ##     ##   ## ##   
###     ## ########  ##       #########    ##        ##  ## ## ## ##     ##    ###    
########## ##   ##   ##       ##     ##    ##        ##  ##  #### ##     ##   ## ##   
###     ## ##    ##  ##    ## ##     ##    ##        ##  ##   ### ##     ##  ##   ##  
###     ## ##     ##  ######  ##     ##    ######## #### ##    ##  #######  ##     ## 
#####    https://patorjk.com/software/taag/#p=display&f=Banner3&t=arch%20linux    ####
#region archlinux
# 自动运行startx autologin See getty archwiki 
if [[ $(tty) == "/dev/tty1" ]]; then
    startx
fi
export DISPLAY=172.20.224.1
#endregion
