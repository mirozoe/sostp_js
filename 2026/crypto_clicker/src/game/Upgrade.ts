import { UPGRADE_ICONS } from './icons.ts';
import type { UpgradeKind, UpgradeSnapshot, UpgradeType } from './types.ts';

/**
 * ============================================================================
 *  ABSTRAKTNÍ TŘÍDA + DĚDIČNOST + POLYMORFISMUS
 * ============================================================================
 *
 *  `abstract` znamená: tuhle třídu NELZE vytvořit přímo.
 *  `new Upgrade()` je chyba už při psaní kódu. Proč? Protože „vylepšení"
 *  je abstraktní pojem – ve hře existuje jen konkrétní grafická karta
 *  nebo konkrétní farma. Třída definuje SPOLEČNOU KOSTRU, kterou pak
 *  potomci naplní vlastními hodnotami.
 *
 *  MODIFIKÁTORY PŘÍSTUPU – celý smysl zapouzdření:
 *    private   … vidí jen tato třída (ani potomci)
 *    protected … vidí tato třída A její potomci (ne vnější svět)
 *    public    … vidí kdokoli
 *
 *  Pravidlo palce: začni u `private` a uvolňuj, jen když musíš.
 *  Opačný postup (všechno `public`) vede k neudržovatelnému kódu.
 */
export abstract class Upgrade {
  /**
   * Úroveň je `private` – nikdo ji nesmí přepsat zvenčí, jinak by si
   * hráč mohl v konzoli nastavit level 9999. Měnit ji lze VÝHRADNĚ
   * metodou `levelUp()`, která je pod naší kontrolou.
   */
  private _level = 0;

  /**
   * Cesta k ikoně. Nebereme ji jako parametr – vytáhneme si ji z typově
   * pojištěné mapy podle typu vylepšení. Nelze tak omylem přiřadit
   * grafické kartě obrázek farmy.
   */
  public readonly iconPath: string;

  /**
   * `protected readonly` v parametrech konstruktoru:
   * TypeScript z parametru rovnou udělá vlastnost třídy. Ušetří to
   * nudné `this.name = name;` řádky.
   *
   * `readonly` = po vytvoření se hodnota nikdy nemění (cena karty je daná).
   * `protected` = potomci k ní mají přístup, vnější svět ne.
   */
  protected constructor(
    public readonly type: UpgradeType,
    public readonly name: string,
    public readonly kind: UpgradeKind,
    protected readonly baseCost: number,
    protected readonly effectPerLevel: number,
  ) {
    this.iconPath = UPGRADE_ICONS[type];
  }

  /**
   * ABSTRAKTNÍ METODA – potomek ji MUSÍ implementovat.
   * Kompilátor to vynutí; když na to zapomeneš, kód se nepřeloží.
   * Díky tomu má každé vylepšení vlastní vtipný popisek.
   */
  public abstract get description(): string;

  /**
   * GETTER – navenek vypadá jako obyčejná vlastnost (`upgrade.level`),
   * ale ve skutečnosti je to metoda. Umožňuje čtení bez možnosti zápisu.
   */
  public get level(): number {
    return this._level;
  }

  /**
   * Cena roste exponenciálně (každá úroveň je o 15 % dražší).
   *
   * Tohle je srdce každé clicker hry: bez růstu ceny by hráč po pár
   * minutách koupil všechno a neměl by co dělat. Exponenciála zajistí,
   * že hra zůstane zajímavá i po hodinách.
   *
   * `Math.floor` – s desetinnými mincemi by se cena zobrazovala ošklivě.
   */
  public get cost(): number {
    return Math.floor(this.baseCost * Math.pow(1.15, this._level));
  }

  /**
   * Kolik toto vylepšení celkem přispívá (úroveň × efekt za úroveň).
   */
  public get totalEffect(): number {
    return this._level * this.effectPerLevel;
  }

  /** Kolik přibude po dalším nákupu – pro zobrazení v obchodě. */
  public get nextEffect(): number {
    return this.effectPerLevel;
  }

  /**
   * Zvýší úroveň o jedna. Jediná povolená cesta ke změně `_level`.
   *
   * POZOR: metoda ZÁMĚRNĚ neřeší placení. O peníze se stará `GameEngine`.
   * Tomu se říká princip jediné odpovědnosti (Single Responsibility) –
   * vylepšení ví, co umí, ale nespravuje hráčovu peněženku.
   */
  public levelUp(): void {
    this._level += 1;
  }

  /**
   * Obnoví úroveň z uloženého saveu.
   *
   * `Math.max(0, ...)` a `Math.floor` jsou obrana proti poškozenému
   * nebo ručně upravenému souboru v localStorage. Nikdy nevěř datům,
   * která přišla zvenčí – ani vlastním.
   */
  public restoreLevel(level: number): void {
    this._level = Math.max(0, Math.floor(level));
  }

  /**
   * Vyrobí neměnný snímek pro React vrstvu.
   *
   * PROČ nepředat rovnou instanci třídy? React porovnává data podle
   * reference a s třídami plnými metod se mu pracuje špatně. Snímek je
   * navíc `readonly`, takže komponenta nemůže stav rozbít.
   */
  public toSnapshot(coins: number): UpgradeSnapshot {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      iconPath: this.iconPath,
      level: this._level,
      cost: this.cost,
      kind: this.kind,
      effectPerLevel: this.effectPerLevel,
      affordable: coins >= this.cost,
    };
  }
}

/* ===========================================================================
 *  KONKRÉTNÍ VYLEPŠENÍ
 *
 *  Každá třída dědí kostru z `Upgrade` a doplní jen to své. Všimni si,
 *  kolik kódu jsme díky dědičnosti NEMUSELI psát – logiku ceny, úrovní
 *  i snímků máme jednou a sdílenou.
 * ======================================================================== */

/** Klikací vylepšení – zvyšuje výnos z jednoho kliknutí. */
export class EnergyDrinkUpgrade extends Upgrade {
  public constructor() {
    super('energyDrink', 'Energeťák do žíly', 'click', 25, 1);
  }

  public override get description(): string {
    return `Kapačka s energeťákem přímo do žíly. Spánek je pro slabé. +${this.nextEffect} za klik.`;
  }
}

/** Klikací vylepšení vyššího řádu. */
export class GpuUpgrade extends Upgrade {
  public constructor() {
    super('gpu', 'RTX 5090', 'click', 250, 12);
  }

  public override get description(): string {
    return `Grafika dražší než ojeté auto. Hraje Minecraft v 8K a mimochodem i těží. +${this.nextEffect} za klik.`;
  }
}

/** Pasivní vylepšení – vydělává samo, i když nekliká. */
export class FarmUpgrade extends Upgrade {
  public constructor() {
    super('farm', 'Farma v mamčině sklepě', 'passive', 100, 1);
  }

  public override get description(): string {
    return `Osm grafik na sušáku na prádlo. Mamka se ptá, proč je pořád takové horko. +${this.nextEffect}/s.`;
  }
}

/** Pasivní vylepšení – mírně pochybné etiky. */
export class BotnetUpgrade extends Upgrade {
  public constructor() {
    super('botnet', 'Botnet ze školní učebny', 'passive', 1_100, 8);
  }

  public override get description(): string {
    return `Třicet školních počítačů těží místo výuky informatiky. Pan učitel nic netuší. +${this.nextEffect}/s.`;
  }
}

/** Pasivní vylepšení – konečně něco vážného. */
export class QuantumUpgrade extends Upgrade {
  public constructor() {
    super('quantum', 'AI Quantum Rig', 'passive', 12_000, 47);
  }

  public override get description(): string {
    return `Kvantový počítač s AI. Vytěží minci dřív, než se rozhodneš kliknout. +${this.nextEffect}/s.`;
  }
}

/** Pasivní vylepšení – endgame. */
export class DysonSphereUpgrade extends Upgrade {
  public constructor() {
    super('dysonSphere', 'Dysonova sféra', 'passive', 130_000, 260);
  }

  public override get description(): string {
    return `Obalili jsme Slunce solárními panely. Elektřina zadarmo, planeta v mírném šoku. +${this.nextEffect}/s.`;
  }
}
