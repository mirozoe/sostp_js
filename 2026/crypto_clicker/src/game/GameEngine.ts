import { EventBus, type Unsubscribe } from './EventBus.ts';
import { StorageService } from './StorageService.ts';
import type { Upgrade } from './Upgrade.ts';
import { UpgradeFactory } from './UpgradeFactory.ts';
import type { GameSnapshot, SaveData, UpgradeType } from './types.ts';

/**
 * ============================================================================
 *  NÁVRHOVÝ VZOR: SINGLETON (Jedináček)
 * ============================================================================
 *
 *  CO TO JE:
 *  Zaručuje, že třída bude mít v celé aplikaci právě JEDNU instanci,
 *  ke které se odkudkoli dostaneš přes `GameEngine.getInstance()`.
 *
 *  JAK SE TO DĚLÁ – dva klíčové kousky skládačky:
 *    1) `private constructor` … `new GameEngine()` zvenčí je chyba
 *    2) `private static instance` … třída si jedinou instanci drží sama
 *
 *  PROČ TADY DÁVÁ SMYSL:
 *  Stav hry musí být jeden jediný. Kdyby existovaly dva enginy, každý by
 *  měl vlastní počet mincí, běžela by dvojí herní smyčka a ukládání by se
 *  navzájem přepisovalo.
 *
 *  ⚠️ ALE POZOR – KDY JE SINGLETON ANTIPATTERN:
 *  Singleton je globální proměnná v obleku a nese její neduhy:
 *    • Špatně se testuje – stav přetéká mezi testy, protože instance
 *      zůstává v paměti. (Proto tu máme `resetInstance()` pro testy.)
 *    • Skrývá závislosti – z hlavičky funkce nepoznáš, že sahá na engine.
 *    • Svádí k tomu udělat singleton ze všeho.
 *
 *  Profesionální alternativa je „dependency injection": instanci vytvoříš
 *  jednou nahoře v aplikaci a předáváš ji tam, kde je potřeba. Ve větších
 *  projektech je to lepší volba. Tady používáme Singleton záměrně – je to
 *  učebnicová ukázka vzoru a pro jednu malou hru je plně dostačující.
 */
export class GameEngine {
  /** Jediná instance. `static` = patří třídě, ne konkrétnímu objektu. */
  private static instance: GameEngine | null = null;

  /** Herní smyčka tiká 10× za sekundu – plynulejší než jednou za sekundu. */
  private static readonly TICK_MS = 100;
  private static readonly TICKS_PER_SECOND = 1000 / GameEngine.TICK_MS;
  private static readonly AUTOSAVE_TICKS = 100; // autosave každých ~10 s

  /** Počet mincí. `private` – zvenčí čitelný jen přes getter. */
  private _coins = 0;
  private _totalClicks = 0;
  private tickCounter = 0;

  private readonly upgrades: readonly Upgrade[];
  private readonly bus = new EventBus();
  private readonly storage = new StorageService();

  /**
   * Cache snímku – drobná, ale zásadní optimalizace pro React.
   *
   * React přes `useSyncExternalStore` volá `getSnapshot()` velmi často
   * a porovnává výsledek pomocí `Object.is`. Kdybychom pokaždé vytvořili
   * nový objekt, React by si myslel, že se stav pořád mění, a překresloval
   * by donekonečna – až po pád s „Maximum update depth exceeded".
   *
   * Řešení: snímek přepočítáme jen tehdy, když se stav opravdu změnil.
   */
  private cachedSnapshot: GameSnapshot | null = null;

  /** ID intervalu – potřebujeme ho k zastavení smyčky. */
  private loopId: ReturnType<typeof setInterval> | null = null;

  /**
   * PRIVÁTNÍ KONSTRUKTOR – zámek na dveřích Singletonu.
   * Zvenčí zavolat nelze; jediný, kdo smí, je `getInstance()`.
   */
  private constructor() {
    // Vylepšení si nevyrábíme sami – to je práce továrny (Factory Method).
    this.upgrades = UpgradeFactory.createAll();
  }

  /**
   * Jediný veřejný vstup k instanci.
   *
   * Vzor „lazy initialization": instance vznikne až při prvním zavolání,
   * ne při načtení souboru.
   */
  public static getInstance(): GameEngine {
    if (GameEngine.instance === null) {
      GameEngine.instance = new GameEngine();
    }
    return GameEngine.instance;
  }

  /**
   * Zahodí instanci. Určeno pro testy, kde potřebuješ čistý stav.
   * Bez téhle metody by byl Singleton v testech noční můra.
   */
  public static resetInstance(): void {
    GameEngine.instance?.stopLoop();
    GameEngine.instance = null;
  }

  /* --------------------------------------------------------------------
   *  ZAPOUZDŘENÍ – gettery ven, žádné settery
   * ------------------------------------------------------------------ */

  /**
   * Mince jsou čitelné, ale NEZAPISOVATELNÉ.
   *
   * Schválně tu není `set coins()`. Kdyby existoval, mohl by kdokoli
   * napsat `engine.coins = 999999` a hra by ztratila smysl. Mince se
   * mění výhradně přes `click()` a `buyUpgrade()`, kde platí pravidla.
   * Přesně o tomhle je zapouzdření.
   */
  public get coins(): number {
    return this._coins;
  }

  public get totalClicks(): number {
    return this._totalClicks;
  }

  /**
   * Výnos za klik = základní 1 mince + příspěvky klikacích vylepšení.
   *
   * POLYMORFISMUS V PRAXI: procházíme kolekci abstraktních `Upgrade`
   * a ptáme se jich na `totalEffect`. Vůbec nás nezajímá, jestli je to
   * energeťák nebo grafika – každý objekt ví sám, kolik přidá.
   */
  public get coinsPerClick(): number {
    return this.upgrades
      .filter((upgrade: Upgrade): boolean => upgrade.kind === 'click')
      .reduce((sum: number, upgrade: Upgrade): number => sum + upgrade.totalEffect, 1);
  }

  /** Pasivní příjem za sekundu. */
  public get coinsPerSecond(): number {
    return this.upgrades
      .filter((upgrade: Upgrade): boolean => upgrade.kind === 'passive')
      .reduce((sum: number, upgrade: Upgrade): number => sum + upgrade.totalEffect, 0);
  }

  /* --------------------------------------------------------------------
   *  HERNÍ AKCE
   * ------------------------------------------------------------------ */

  /** Hráč klikl na minci. */
  public click(): void {
    this._coins += this.coinsPerClick;
    this._totalClicks += 1;
    this.invalidateAndNotify();
  }

  /**
   * Pokusí se koupit vylepšení.
   *
   * Vrací `boolean` místo vyhazování výjimky – „nemáš dost peněz" není
   * chyba programu, ale běžná herní situace. UI podle návratové hodnoty
   * může přehrát animaci.
   */
  public buyUpgrade(type: UpgradeType): boolean {
    const upgrade: Upgrade | undefined = this.upgrades.find(
      (candidate: Upgrade): boolean => candidate.type === type,
    );

    // `undefined` kontrola je povinná – `noUncheckedIndexedAccess` a `find`
    // nás nutí ošetřit případ, kdy vylepšení neexistuje.
    if (upgrade === undefined) {
      return false;
    }

    // Nejdřív ověř, potom strhni. Nikdy naopak.
    if (this._coins < upgrade.cost) {
      return false;
    }

    this._coins -= upgrade.cost;
    upgrade.levelUp();
    this.invalidateAndNotify();
    return true;
  }

  /* --------------------------------------------------------------------
   *  HERNÍ SMYČKA
   * ------------------------------------------------------------------ */

  /**
   * Spustí hlavní herní smyčku (`setInterval`).
   *
   * Pojistka proti dvojímu spuštění: bez ní by při hot-reloadu běželo
   * několik smyček naráz a hráč by nečekaně bohatl.
   */
  public startLoop(): void {
    if (this.loopId !== null) {
      return;
    }

    this.loopId = setInterval((): void => {
      this.tick();
    }, GameEngine.TICK_MS);
  }

  /** Zastaví smyčku a uklidí po sobě. */
  public stopLoop(): void {
    if (this.loopId !== null) {
      clearInterval(this.loopId);
      this.loopId = null;
    }
  }

  /**
   * Jeden tik smyčky.
   *
   * Přičteme jen desetinu sekundového výnosu, protože tikáme 10× za
   * sekundu. Číslo na obrazovce tak roste plynule místo skokově.
   */
  private tick(): void {
    const income: number = this.coinsPerSecond / GameEngine.TICKS_PER_SECOND;

    if (income > 0) {
      this._coins += income;
      this.invalidateAndNotify();
    }

    this.tickCounter += 1;
    if (this.tickCounter >= GameEngine.AUTOSAVE_TICKS) {
      this.tickCounter = 0;
      this.save();
    }
  }

  /* --------------------------------------------------------------------
   *  OBSERVER – napojení na UI
   * ------------------------------------------------------------------ */

  /**
   * Přihlásí posluchače ke změnám stavu.
   * Engine netuší, že na druhém konci je React – a to je záměr.
   */
  public subscribe(listener: () => void): Unsubscribe {
    return this.bus.subscribe(listener);
  }

  /**
   * Vrátí aktuální snímek stavu.
   *
   * Díky cache vrací při nezměněném stavu POŘÁD TENTÝŽ objekt (stejnou
   * referenci), což React potřebuje, aby poznal, že překreslovat netřeba.
   */
  public getSnapshot(): GameSnapshot {
    if (this.cachedSnapshot === null) {
      const coins: number = Math.floor(this._coins);

      this.cachedSnapshot = {
        coins,
        totalClicks: this._totalClicks,
        coinsPerClick: this.coinsPerClick,
        coinsPerSecond: this.coinsPerSecond,
        upgrades: this.upgrades.map((upgrade: Upgrade) => upgrade.toSnapshot(coins)),
      };
    }

    return this.cachedSnapshot;
  }

  /** Zneplatní cache a oznámí změnu posluchačům. */
  private invalidateAndNotify(): void {
    this.cachedSnapshot = null;
    this.bus.notify();
  }

  /* --------------------------------------------------------------------
   *  UKLÁDÁNÍ
   * ------------------------------------------------------------------ */

  /** Uloží stav hry do localStorage. */
  public save(): void {
    const levels: Record<string, number> = {};
    for (const upgrade of this.upgrades) {
      levels[upgrade.type] = upgrade.level;
    }

    this.storage.save({
      version: this.storage.currentVersion,
      coins: this._coins,
      totalClicks: this._totalClicks,
      levels,
    });
  }

  /** Načte uloženou hru. Vrací `true`, pokud se save podařilo obnovit. */
  public load(): boolean {
    const data: SaveData | null = this.storage.load();
    if (data === null) {
      return false;
    }

    this._coins = Math.max(0, data.coins);
    this._totalClicks = Math.max(0, Math.floor(data.totalClicks));

    for (const upgrade of this.upgrades) {
      const level: number | undefined = data.levels[upgrade.type];
      if (typeof level === 'number') {
        upgrade.restoreLevel(level);
      }
    }

    this.invalidateAndNotify();
    return true;
  }

  /** Smaže postup a začne od nuly. */
  public reset(): void {
    this._coins = 0;
    this._totalClicks = 0;
    for (const upgrade of this.upgrades) {
      upgrade.restoreLevel(0);
    }
    this.storage.clear();
    this.invalidateAndNotify();
  }
}
