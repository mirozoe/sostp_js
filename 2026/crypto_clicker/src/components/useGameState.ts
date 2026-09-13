import { useSyncExternalStore } from 'react';
import { GameEngine } from '../game/GameEngine.ts';
import type { GameSnapshot } from '../game/types.ts';

/**
 * ============================================================================
 *  MOST MEZI OOP SVĚTEM A REACTEM
 * ============================================================================
 *
 *  Tady se potkávají dva světy:
 *    • `GameEngine` – objektový, mění se v čase (mutable), nezná React
 *    • React        – deklarativní, pracuje s neměnnými daty
 *
 *  `useSyncExternalStore` je hook přímo od tvůrců Reactu určený pro tenhle
 *  případ: napojení na stav, který žije MIMO React. Chce tři věci:
 *
 *    1) subscribe   – jak se přihlásit ke změnám (náš Observer!)
 *    2) getSnapshot – jak přečíst aktuální stav
 *    3) getServerSnapshot – totéž pro serverové vykreslení
 *
 *  Všimni si, jak přesně to sedí na `EventBus`. Observer pattern jsme
 *  nepsali jako samoúčelné cvičení – React ho přímo vyžaduje.
 */

/** Instanci si vytáhneme jednou. Singleton zaručí, že je pořád stejná. */
const engine: GameEngine = GameEngine.getInstance();

/**
 * Funkce jsou definované MIMO komponentu záměrně.
 *
 * Kdybychom je psali uvnitř, vznikaly by při každém renderu nové funkce,
 * React by se pokaždé odhlásil a znovu přihlásil a hra by zbytečně
 * zpomalovala.
 */
const subscribe = (listener: () => void): (() => void) => engine.subscribe(listener);
const getSnapshot = (): GameSnapshot => engine.getSnapshot();

/**
 * Hook vracející aktuální stav hry.
 *
 * Komponenta ho zavolá a dostane vždy čerstvá data. O překreslení
 * se React postará sám, jakmile engine zavolá `notify()`.
 */
export function useGameState(): GameSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/**
 * Vrací samotný engine pro vyvolávání akcí (klik, nákup, reset).
 *
 * Rozdělení na „data" (`useGameState`) a „akce" (`useGameEngine`) je
 * záměrné: komponenta, která jen zobrazuje, nepotřebuje engine vůbec.
 */
export function useGameEngine(): GameEngine {
  return engine;
}
