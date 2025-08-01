nnoremap <expr> <F4> CountSpaces()
xnoremap <expr> <F4> CountSpaces()
" doubling <F4> works on a line
nnoremap <expr> <F4><F4> CountSpaces() .. '_'

function CountSpaces(context = {}, type = '') abort
  if a:type == ''
    let context = #{
      \ dot_command: v:false,
      \ extend_block: '',
      \ virtualedit: [&l:virtualedit, &g:virtualedit],
      \ }
    let &operatorfunc = function('CountSpaces', [context])
    set virtualedit=block
    return 'g@'
  endif

  let save = #{
    \ clipboard: &clipboard,
    \ selection: &selection,
    \ virtualedit: [&l:virtualedit, &g:virtualedit],
    \ register: getreginfo('"'),
    \ visual_marks: [getpos("'<"), getpos("'>")],
    \ }

  try
    set clipboard= selection=inclusive virtualedit=
	echom a:type
    let commands = #{
      \ line: "'[V']",
      \ char: "`[v`]",
      \ block: "`[\<C-V>`]",
      \ }[a:type]
    let [_, _, col, off] = getpos("']")
    if off != 0
      let vcol = getline("'[")->strpart(0, col + off)->strdisplaywidth()
      if vcol >= [line("'["), '$']->virtcol() - 1
        let a:context.extend_block = '$'
      else
        let a:context.extend_block = vcol .. '|'
      endif
    endif
    if a:context.extend_block != ''
      let commands ..= 'oO' .. a:context.extend_block
    endif
    let commands ..= 'y'
    execute 'silent noautocmd keepjumps normal! ' .. commands
    echomsg getreg('"')->count(' ')
  finally
    call setreg('"', save.register)
    call setpos("'<", save.visual_marks[0])
    call setpos("'>", save.visual_marks[1])
    let &clipboard = save.clipboard
    let &selection = save.selection
    let [&l:virtualedit, &g:virtualedit] = get(a:context.dot_command ? save : a:context, 'virtualedit')
    let a:context.dot_command = v:true
  endtry
endfunction
