# Doporučení pro nastavení IDE

## Visual Studio Code
MS IDE, který je velmi oblíbený, zdarma ke stažení a používání.

### Instalace
Stáhnout [zde](https://code.visualstudio.com) a nainstalovat

### Nastavení
Je vhodné doinstalovat následující pluginy:
* Live Server - updatuje webovou stránku automaticky
* Bracket Pair Colorizer - jednoduší identifikace závorek
* JavaScript (ES6) code snippets
Poté je zapotřebí editor restartovat.

## Vim

Open source, lightweight editor, který se snadno dá použít přes SSH. Na naučení obtížnější, ale s řadou pokročliých funkcí, které pravděpodobně nenajdete jinde.

### Nastavení
1. instalujte vim (např. `apt install vim`)
2. vytvořte adresář ~/.vim/boundle (`mkdir -p ~/.vim/boundle`)
3. přesuňte se do nově vytvořeného adresáře (`cd ~/.vim/boundle`)
4. naklonujte následující GIT repozitáře (`git clone abc`):
  * https://github.com/pangloss/vim-javascrip
  * https://github.com/garbas/vim-snipmate
  * git clone https://github.com/honza/vim-snippets.git
  * https://github.com/tomtom/tlib_vim.git
  * https://github.com/MarcWeber/vim-addon-mw-utils.git
  * https://github.com/ycm-core/YouCompleteMe.git
  * https://github.com/scrooloose/nerdtree
  * https://github.com/vim-airline/vim-airline.git
5. zkopírujte přiložený .vimrc soubor do svého home adresáře

### Práce s pluginy
Předdefinované snipety (např. if<C-j> vytvoří if(){} strukturu) jsou definované [zde](https://github.com/grvcoelho/vim-javascript-snippets). NERDTree je souborový manažer pro Vim, spouští se přímo ve Vim (:NERTree) a pro přepínání mezi okny <C-w-w>. YouCompleteMe navrhuje doplňování příkazů, v seznamu se pohybujete pomící TAB nebo šipek. Máte-li vybráno, pište dál a příkaz se YCM doplní.
