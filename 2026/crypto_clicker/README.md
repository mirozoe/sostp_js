# Crypto Clicker ₿

Výuková hra pro kurz webových aplikací v TypeScriptu. Klikáním těžíš mince,
za mince kupuješ vylepšení a ta pak vydělávají i bez tebe.

Cílem není hra samotná, ale **kód pod ní**: objektově orientovaný návrh
a tři klasické návrhové vzory v reálném použití.

## Spuštění

Potřebuješ [Bun](https://bun.sh). Instalace na Linuxu/macOS:

```bash
curl -fsSL https://bun.sh/install | bash
```

Pak už jen:

```bash
bun install     # stáhne závislosti
bun run dev     # spustí hru na http://localhost:3000
```

Další příkazy:

```bash
bun run build      # sestaví hru do složky dist/
bun run typecheck  # zkontroluje typy (musí projít bez jediné chyby)
```

## Kde hledat co

```
src/
├── game/                 ← herní logika, o Reactu vůbec neví
│   ├── types.ts            union typy a rozhraní
│   ├── EventBus.ts         Observer pattern
│   ├── Upgrade.ts          abstraktní třída + 6 potomků
│   ├── UpgradeFactory.ts   Factory Method pattern
│   ├── GameEngine.ts       Singleton pattern, herní smyčka
│   ├── StorageService.ts   ukládání do localStorage
│   └── icons.ts            typově pojištěná mapa obrázků
│
├── components/           ← React, o pravidlech hry neví
│   ├── useGameState.ts     most mezi enginem a Reactem
│   ├── App.tsx             kořenová komponenta
│   ├── CoinCounter.tsx     počítadlo mincí
│   ├── ClickerButton.tsx   velké klikací tlačítko
│   ├── Shop.tsx            obchod
│   └── UpgradeCard.tsx     karta jednoho vylepšení
│
└── style.css             ← neonový dark mode
```

## Tři návrhové vzory

**Singleton** (`GameEngine.ts`) – zaručí, že stav hry existuje jen jednou.
Privátní konstruktor + statická metoda `getInstance()`. V komentářích najdeš
i to, **kdy je Singleton špatný nápad** – to je stejně důležité jako vzor sám.

**Factory Method** (`UpgradeFactory.ts`) – engine řekne „chci vylepšení typu
`gpu`" a nemusí znát konkrétní třídy. Přidání nového vylepšení tak nevyžaduje
zásah do enginu. Uvnitř najdeš i trik s typem `never` pro kontrolu úplnosti.

**Observer** (`EventBus.ts`) – engine oznamuje změny, aniž by věděl komu.
Díky tomu je herní logika nezávislá na Reactu. React se napojuje hookem
`useSyncExternalStore`.

## Klíčové pravidlo architektury

> Složka `game/` nesmí nikdy importovat z `components/`.

Závislost jde jen jedním směrem: **React zná engine, engine nezná React.**
Herní logiku bys mohl beze změny pustit na serveru nebo přepsat UI do Vue.

## Na co se v kódu zaměřit

- `private`, `protected`, `public` – proč není `coins` veřejně zapisovatelné
- gettery bez setterů jako nástroj zapouzdření
- abstraktní třída a polymorfismus v `Upgrade.ts`
- type guard v `StorageService.ts` a proč je lepší než přetypování `as`
- úklidová funkce v `useEffect` – každý `setInterval` potřebuje `clearInterval`

## Nápady na vlastní rozšíření

1. Přidej sedmé vylepšení. Kolik souborů musíš upravit? (Odpověď: tři –
   a kompilátor tě na všechny sám upozorní.)
2. Doplň systém achievementů – hodí se na další Observer.
3. Přidej „prestige": vynuluj postup výměnou za trvalý násobič.
4. Naprogramuj offline výdělek podle času posledního uložení.
