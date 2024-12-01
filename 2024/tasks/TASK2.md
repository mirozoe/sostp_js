# Fetch call

Vytvořte aplikaci, která bude zobrazovat výsledky volání vzdáleného REST API. Využijte API, které poskytuje fake data, ale pro výuku je naprosto dostačující. Budete využívat `/posts`, které vrací seznam 100 "článk".
Aplikace bude obsahovat tlačítko, které po kliknutí zavolá `https://jsonplaceholder.typicode.com/posts ` pomocí fetch a zpracuje JSON výsledek volání. Tento výsledek zobrazí v tabulce (1:1 řádek:title), jako odkaz (link) jež po rozkliknutí zavolá `https://jsonplaceholder.typicode.com/posts/1` (číslo za lomítkem na konci URL odpovídá `id` daného článku). Výsledek volání bude opět zpracován jako JSON a zobrazen, jakoukoliv formou.
Před tabulkou bude zobrazené vstupní pole, které bude umožňovat filtrovat výsledek volání na základě vloženého textu, tak aby se v tabulce zobrazily pouze řádky, které obsahují vložený text. Filtrování může probíhat onfly dle vkládání textu uživatelem nebo po stisknutí tlačítka, které umístíte vedle vstupního pole. V případě, že vstupní pole bude prázdné zobrazí se všechny odpovědi získané z API.
Pro vypracování použijte vanilla JavaScript případně Vue.

Aplikace musí obsahovat:
* Tlačítko a volání jsonplaceholder API
* Vstupní pole pro filtrování (příp. také tlačítko)
* Tabulku s výsledky volání
* Link u každého článku na jeho detail
