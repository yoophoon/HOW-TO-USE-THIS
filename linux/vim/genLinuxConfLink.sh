#! /usr/bin/bash

# simple shell scripts generate links to this directory's contents which located in ~/.vim
# this was created for wsl2 file system may cause some problem, e.g. vimspector can't start debug server
# 

# create vim config file directory
# if target directory exist , delete and create ,otherwise , create
VIMCONF_PATH="$HOME/.vim"
if [[ -d $VIMCONF_PATH ]];then
  rm -rf $VIMCONF_PATH
  mkdir $VIMCONF_PATH
else
  mkdir $VIMCONF_PATH
fi

# generate links
for file in  $(dirname $(realpath "$0"))/*;do 
  ln -s -t $VIMCONF_PATH $file
done
