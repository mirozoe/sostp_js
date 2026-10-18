# Seznam domácích úkolů

## Úvod do JS/TS (do 28.9.)

Podívejte se na následující krátká videa o TS:
- https://www.youtube.com/watch?v=mTt_D5idYWM&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=1
- https://www.youtube.com/watch?v=SMjc982g0w4&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=4
- https://www.youtube.com/watch?v=KxLAWAlPbg0&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=6
- https://www.youtube.com/watch?v=KxLAWAlPbg0&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=7
- https://www.youtube.com/watch?v=U_u3HthPNsM&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=9
- https://www.youtube.com/watch?v=DojCwL4W8g0&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=11
- https://www.youtube.com/watch?v=r4zLHuzFGI0&list=PLQ8x_VWW6AkvlMSxICuexWjk_vwfWbqG1&index=13

### Následující dvě videa vysvětlují práci s dynamicky alokovanou pamětí:

- https://www.youtube.com/watch?v=t9XoYXavbS4
- https://www.youtube.com/watch?v=y6IHi-ODv1w

### Dobrovolné video pro doplnění znalostí

- https://www.youtube.com/watch?v=d56mG7DezGs&t=2s

## Úvod do tříd a práce s nimi (do 12.10.)

- https://www.youtube.com/watch?v=QygRnETpBIg&list=PLTjRvDozrdlxJjrQ4phZAUmiRn-HbK3M_&index=2
- https://www.youtube.com/watch?v=W9Ah_ZDFc1c&list=PLTjRvDozrdlxJjrQ4phZAUmiRn-HbK3M_&index=3
- https://www.youtube.com/watch?v=tiWqCBXnWj0&list=PLTjRvDozrdlxJjrQ4phZAUmiRn-HbK3M_&index=4
- https://www.youtube.com/watch?v=P17bFRuefjA&list=PLTjRvDozrdlxJjrQ4phZAUmiRn-HbK3M_&index=5
- https://www.youtube.com/watch?v=azCCiJJjKr4&list=PLTjRvDozrdlxJjrQ4phZAUmiRn-HbK3M_&index=6

## Úvod do React + TS (do 19.10.)

- https://www.youtube.com/watch?v=SqcY0GlETPk&t=163s

### Samostatná klasifikovaná práce (odeslat mailem do 30.10.)

Název úkolu: Webová aplikace pro sledování skóre zápasu 

Specifikace aplikace:
Vytvořte jednoduchou jednostránkovou aplikaci, která bude fungovat jako světelná tabule pro sledování skóre sportovního zápasu mezi dvěma týmy: **Domácí** a **Hosté**. 

Aplikace musí obsahovat následující prvky a funkce: 

1. Zobrazení skóre: Na obrazovce bude jasně vidět aktuální skóre obou týmů. Počáteční stav při načtení stránky je 0:0.
2. Ovládací tlačítka: Každý tým bude mít svá vlastní tlačítka pro přičítání bodů: 

  * Tlačítko "+1 bod"
3. Resetování zápasu: Společné tlačítko "Reset zápasu", které po kliknutí vynuluje skóre obou týmů zpět na 0:0.
4. Určení vítěze (Podmíněné zobrazování): Aplikace bude dynamicky reagovat na stav zápasu. Pod skóre nebo vedle něj se bude zobrazovat text, který se mění podle situace: 

  * "Vyhrávají Domácí" (pokud mají více bodů)
  * "Vyhrávají Hosté" (pokud mají více bodů)
  * "Zápas je nerozhodný" (pokud mají stejně bodů)

Technické požadavky: 

* Framework: React (použití React hook useState).
* Jazyk: TypeScript (striktní definice rozhraní pro stav komponenty interface State, zákaz používání typu any).
* Architektura: Aplikace může být napsána v jedné hlavní komponentě (např. App.tsx).
* Stylování: Základní vizuální úprava pomocí CSS, aby byla tabule přehledná (např. zarovnání týmů vedle sebe, dostatečně velké písmo pro skóre).

Forma odevzdání:
Odevzdávejte archiv (ZIP) obsahující zdrojový kód (složku src) a package.json. Složku node_modules před zabalením smažte. Případně můžete odevzdat odkaz na váš kód v JSFiddle.
Hodnocení: Hodnotit se bude funkčnost, správné použití TypeScriptu a čistota kódu.

### Pro doplnění znalostí

- https://www.youtube.com/watch?v=91TIUURx5JM
