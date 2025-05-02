# install coc.nvim
COC_PACKPATH="$(dirname $(realpath "$0"))/pack/coc/start/coc.nvim"
if [[ ! -d $COC_PACKPATH ]];then
  git clone --branch release https://github.com/neoclide/coc.nvim.git --depth=1 \
  "$COC_PACKPATH"
fi

# install tabular
TABULAR_PACKPATH="$(dirname $(realpath "$0"))/pack/tabular/start/tabular"
if [[ ! -d $TABULAR_PACKPATH ]];then
  git clone https://github.com/godlygeek/tabular.git --depth=1 "$TABULAR_PACKPATH"
fi

# install vimspector
VIMSPECTOR_PACKPATH="$(dirname $(realpath "$0"))/pack/vimspector/start/vimspector"
if [[ ! -d $VIMSPECTOR_PACKPATH ]];then
  git clone https://github.com/puremourning/vimspector.git --depth=1 "$VIMSPECTOR_PACKPATH"
fi

