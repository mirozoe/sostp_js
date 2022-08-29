set tabstop=2
set shiftwidth=2
set expandtab
colorscheme molokai
set number
set cursorline
set history=500
syntax on
filetype plugin indent on

let g:airline#extensions#tabline#enabled = 1
let python_highlight_all=1
let g:snipMate = { 'snippet_version' : 1 }

imap <C-J> <esc>a<Plug>snipMateNextOrTrigger
smap <C-J> <Plug>snipMateNextOrTrigger
