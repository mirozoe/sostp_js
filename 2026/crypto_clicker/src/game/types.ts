/**
 * ============================================================================
 *  TYPY – základ striktního TypeScriptu
 * ============================================================================
 *
 *  V celém projektu nenajdeš ani jedno `any`. Místo toho pracujeme
 *  s tzv. UNION TYPY, které kompilátoru přesně řeknou, jaké hodnoty
 *  jsou povolené.
 */

/**
 * Union type místo `string`.
 *
 * PROČ: Kdyby továrna přijímala `string`, mohl bys napsat
 * `createUpgrade('gpuu')` a chyba se projeví až za běhu hry.
 * Takhle na překlep upozorní editor okamžitě, ještě než kód spustíš.
 */
export type UpgradeType =
  | 'gpu'
  | 'energyDrink'
  | 'farm'
  | 'botnet'
  | 'quantum'
  | 'dysonSphere';

/**
 * Vylepšení se dělí na dvě rodiny podle toho, co dělají.
 * Tohle rozlišení využijeme při polymorfismu v `GameEngine`.
 */
export type UpgradeKind = 'click' | 'passive';

/**
 * Neměnný (readonly) snímek stavu hry.
 *
 * PROČ readonly: React vrstva dostane data jen na čtení. Nemůže je
 * omylem přepsat – jediná cesta, jak stav změnit, vede přes metody
 * `GameEngine`. To je zapouzdření v praxi.
 */
export interface GameSnapshot {
  readonly coins: number;
  readonly totalClicks: number;
  readonly coinsPerClick: number;
  readonly coinsPerSecond: number;
  readonly upgrades: readonly UpgradeSnapshot[];
}

/** Snímek jednoho vylepšení pro vykreslení v obchodě. */
export interface UpgradeSnapshot {
  readonly type: UpgradeType;
  readonly name: string;
  readonly description: string;
  readonly iconPath: string;
  readonly level: number;
  readonly cost: number;
  readonly kind: UpgradeKind;
  /** Kolik toto vylepšení přidá při dalším nákupu (za klik nebo za sekundu). */
  readonly effectPerLevel: number;
  /** Může si hráč vylepšení právě teď dovolit? */
  readonly affordable: boolean;
}

/** Data ukládaná do localStorage. Verze slouží k budoucí migraci saveů. */
export interface SaveData {
  readonly version: number;
  readonly coins: number;
  readonly totalClicks: number;
  readonly levels: Readonly<Record<string, number>>;
}
