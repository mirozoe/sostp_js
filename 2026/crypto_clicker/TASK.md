# Kontext projektu
Připravuji kurz webových aplikací v TypeScriptu pro 18leté studenty, kteří jsou začátečníci v TypeScriptu. Cílem je naučit je moderní programovací postupy na interaktivní hře **"Crypto Clicker"**.

# Tvůj úkol
Vygeneruj kompletní zdrojový kód pro jednoduchou webovou hru Crypto Clicker postavenou na **Reactu (TypeScript)** a CSS. Herní logika musí být napsaná striktně pomocí **Objektově Orientovaného Programování (OOP)** a musí implementovat běžné **návrhové vzory (Design Patterns)**. React slouží výhradně jako prezentační vrstva nad touto logikou. Kód musí být připraven pro snadné vložení do online editoru (např. StackBlitz).

# Architektonické požadavky (OOP & Design Patterns)
1. **Singleton Pattern:** Hlavní třída hry `GameEngine` musí být implementována jako Singleton (jediná instance v celé aplikaci), která drží stav hry a herní smyčku. React komponenty se k ní připojují přes hook `useGameState`.
2. **Observer Pattern:** `GameEngine` udržuje seznam posluchačů (`EventBus`). Při každé změně stavu notifikuje React vrstvu (hook `useGameState` se přihlásí k odběru pomocí `useSyncExternalStore`). Toto je přirozený most mezi OOP světem a Reactem.
3. **Factory Method Pattern:** Vytvoř abstraktní třídu `Upgrade` a tovární třídu `UpgradeFactory`. Továrna bude mít metodu `createUpgrade(type: UpgradeType)`, kde `UpgradeType` je TypeScript union type (ne `string`), a vrátí konkrétní instanci daného vylepšení s přednastavenými hodnotami.
4. **Zapouzdření (Encapsulation):** Využívej modifikátory přístupu (`private`, `public`, `protected`) a pro přístup k citlivým datům (např. aktuální počet mincí) použij TypeScript gettery/settery. React komponenty nesmí přímo měnit stav hry — vše jde přes metody `GameEngine`.
5. **Striktní TypeScript:** Žádné klíčové slovo `any`. Všechny metody musí mít přísně definované typy parametrů a návratové typy. Každá komponenta musí mít typované props rozhraní.

# Technické požadavky na kód
1. **Srozumitelnost:** Kód musí obsahovat jasné české komentáře vysvětlující principy OOP a použitých návrhových vzorů (proč tam jsou a jak fungují) — včetně zmínky o nevýhodách (např. kdy je Singleton antipattern).
2. **Moderní Vzhled (CSS):** Temný "Dark Mode" design pro mladou generaci (neonové barvy, animace klikání, responzivní layout, `@keyframes` pro pulz tlačítka a odlétající „+1" floating text).
3. **Herní logika:** Obsahuje metodu pro klikání, nákup upgradů z továrny, hlavní herní smyčku (`setInterval`) pro pasivní příjem a perzistenci stavu do `localStorage`.
4. **Grafika:** Každé vylepšení a hlavní tlačítko mají vlastní **SVG ikonu** (inline nebo v `public/images/`). Styl ikon musí ladit s neonovým dark-mode designem. Ikony jsou adresovány typovaně přes mapu `UpgradeType → cesta`, ne magickými řetězci.

# Požadavky na UI (React)
1. **React + TypeScript** jako UI vrstva. Funkcionální komponenty a hooky.
2. **Oddělení logiky od UI:** React komponenty nesmí obsahovat herní logiku. Veškerý stav drží `GameEngine`; React se na něj napojuje přes hook `useGameState`, který využívá `useSyncExternalStore`.
3. **Komponenty:** `App`, `CoinCounter`, `ClickerButton`, `Shop`, `UpgradeCard`.
4. **Bez `any`** i v props — každá komponenta má typované rozhraní props.

# Požadovaná struktura výstupu
1. **`index.html`** – kostra dokumentu s kořenovým elementem pro React.
2. **`src/style.css`** – kompletní neonový dark-mode design.
3. **`src/game/`** – OOP jádro: `GameEngine` (Singleton), `EventBus` (Observer), abstraktní `Upgrade` a konkrétní podtřídy, `UpgradeFactory`, `StorageService`.
4. **`src/components/`** – React komponenty (`App`, `CoinCounter`, `ClickerButton`, `Shop`, `UpgradeCard`) a hook `useGameState`.
5. **`public/images/`** – SVG ikony pro každé vylepšení, hlavní minci a favicon.

Vygeneruj kód ihned, bez zbytečných úvodních řečí. Používej vtipné herní názvy předmětů (např. "RTX 5090", "AI Quantum Rig"), které osloví 18leté studenty.
