import {
  BotnetUpgrade,
  DysonSphereUpgrade,
  EnergyDrinkUpgrade,
  FarmUpgrade,
  GpuUpgrade,
  QuantumUpgrade,
  Upgrade,
} from './Upgrade.ts';
import type { UpgradeType } from './types.ts';

/**
 * ============================================================================
 *  NÁVRHOVÝ VZOR: FACTORY METHOD (Tovární metoda)
 * ============================================================================
 *
 *  PROBLÉM, KTERÝ ŘEŠÍ:
 *  Bez továrny by `GameEngine` musel znát všechny konkrétní třídy vylepšení
 *  a volat `new GpuUpgrade()`, `new FarmUpgrade()`… Při přidání nového
 *  vylepšení bys musel zasahovat do enginu – a čím víc míst v kódu upravuješ
 *  kvůli jedné změně, tím větší šance, že něco rozbiješ.
 *
 *  JAK TO FUNGUJE:
 *  Engine řekne jen „chci vylepšení typu 'gpu'" a je mu jedno, jaká třída
 *  se za tím skrývá. Zná pouze abstraktní typ `Upgrade`. Znalost konkrétních
 *  tříd je uzavřená tady v továrně.
 *
 *  VÝSLEDEK: Přidání sedmého vylepšení = nová třída + jeden řádek ve `switch`
 *  + jedna položka v union typu. Engine zůstane nedotčený.
 */
export class UpgradeFactory {
  /**
   * Privátní konstruktor brání vytvoření instance.
   *
   * Továrna je čistě sada nástrojů (`static` metody), nemá žádný vlastní
   * stav. `new UpgradeFactory()` by nedávalo smysl, tak to rovnou zakážeme.
   */
  private constructor() {}

  /**
   * TOVÁRNÍ METODA – jádro celého vzoru.
   *
   * Návratový typ je ZÁMĚRNĚ abstraktní `Upgrade`, ne konkrétní třída.
   * Volající tak nemůže být závislý na detailech implementace.
   */
  public static createUpgrade(type: UpgradeType): Upgrade {
    switch (type) {
      case 'energyDrink':
        return new EnergyDrinkUpgrade();
      case 'gpu':
        return new GpuUpgrade();
      case 'farm':
        return new FarmUpgrade();
      case 'botnet':
        return new BotnetUpgrade();
      case 'quantum':
        return new QuantumUpgrade();
      case 'dysonSphere':
        return new DysonSphereUpgrade();
      default:
        /**
         * TRIK S TYPEM `never` – kontrola úplnosti (exhaustiveness check).
         *
         * `never` je typ, který nemůže mít žádnou hodnotu. Pokud jsme
         * ošetřili všechny varianty union typu, kompilátor ví, že sem
         * kód nikdy nedojde, a přiřazení projde.
         *
         * Jakmile ale do `UpgradeType` přidáš novou položku a zapomeneš
         * na ni `case`, TypeScript tenhle řádek podtrhne červeně.
         * Kompilátor ti tak hlídá záda místo tebe.
         */
        return UpgradeFactory.assertNever(type);
    }
  }

  /**
   * Vytvoří všechna vylepšení najednou, seřazená podle ceny.
   * Pořadí v poli určuje pořadí v obchodě.
   */
  public static createAll(): Upgrade[] {
    const order: readonly UpgradeType[] = [
      'energyDrink',
      'farm',
      'gpu',
      'botnet',
      'quantum',
      'dysonSphere',
    ];

    return order.map((type: UpgradeType): Upgrade => UpgradeFactory.createUpgrade(type));
  }

  /** Pomocník pro kontrolu úplnosti `switch`. Nikdy se reálně nezavolá. */
  private static assertNever(value: never): never {
    throw new Error(`Neznámý typ vylepšení: ${String(value)}`);
  }
}
