import type { SaveData } from './types.ts';

/**
 * ============================================================================
 *  SLUŽBA PRO UKLÁDÁNÍ (perzistence do localStorage)
 * ============================================================================
 *
 *  Proč samostatná třída? Princip jediné odpovědnosti (Single Responsibility).
 *  `GameEngine` řeší pravidla hry, `StorageService` řeší ukládání. Kdybys
 *  někdy chtěl ukládat na server místo do prohlížeče, přepíšeš jen tuhle
 *  třídu a zbytek hry se nezmění.
 */
export class StorageService {
  private static readonly STORAGE_KEY = 'crypto-clicker-save';
  private static readonly CURRENT_VERSION = 1;

  /**
   * Uloží stav hry.
   *
   * `try/catch` není zbytečná opatrnost: localStorage vyhodí výjimku
   * v anonymním okně nebo při zaplnění kvóty. Neuložená hra je mrzutost,
   * spadlá hra je chyba – proto raději tiše selžeme.
   */
  public save(data: SaveData): void {
    try {
      localStorage.setItem(StorageService.STORAGE_KEY, JSON.stringify(data));
    } catch {
      console.warn('Uložení hry selhalo (localStorage není dostupný).');
    }
  }

  /**
   * Načte stav hry.
   *
   * Vrací `null`, pokud save neexistuje nebo je poškozený. Volající pak
   * prostě začne novou hru.
   */
  public load(): SaveData | null {
    try {
      const raw: string | null = localStorage.getItem(StorageService.STORAGE_KEY);
      if (raw === null) {
        return null;
      }

      /**
       * `JSON.parse` vrací `any` – jediné místo, kde se `any` v aplikaci
       * vůbec objeví, protože ho tak má napsané samo TypeScript. Proto ho
       * OKAMŽITĚ zachytíme jako `unknown` a prožene ho validací.
       *
       * `unknown` je bezpečný bratranec `any`: dokud typ neověříš,
       * nedovolí ti s hodnotou vůbec nic udělat.
       */
      const parsed: unknown = JSON.parse(raw);

      if (!StorageService.isSaveData(parsed)) {
        console.warn('Uložená hra je poškozená, začínáme znovu.');
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  /** Smaže uloženou hru (tlačítko „Restart"). */
  public clear(): void {
    try {
      localStorage.removeItem(StorageService.STORAGE_KEY);
    } catch {
      /* v anonymním okně nevadí */
    }
  }

  public get currentVersion(): number {
    return StorageService.CURRENT_VERSION;
  }

  /**
   * TYPE GUARD (typová stráž) – funkce vracející `value is SaveData`.
   *
   * TOHLE JE DŮLEŽITÉ: Zápis `parsed as SaveData` by kompilátor spolkl,
   * ale byla by to LEŽ. Přetypování nic neověřuje – jen umlčí kompilátor
   * a hra spadne později na nesmyslných datech.
   *
   * Type guard naopak data SKUTEČNĚ zkontroluje za běhu. Když vrátí
   * `true`, TypeScript od té chvíle ví, že hodnota má správný tvar –
   * a ty víš, že to je pravda.
   */
  private static isSaveData(value: unknown): value is SaveData {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const candidate = value as Record<string, unknown>;

    if (typeof candidate['coins'] !== 'number' || !Number.isFinite(candidate['coins'])) {
      return false;
    }
    if (typeof candidate['totalClicks'] !== 'number') {
      return false;
    }
    if (typeof candidate['version'] !== 'number') {
      return false;
    }

    const levels: unknown = candidate['levels'];
    if (typeof levels !== 'object' || levels === null) {
      return false;
    }

    // Každá úroveň musí být číslo – jinak by šlo do hry propašovat cokoli.
    return Object.values(levels as Record<string, unknown>).every(
      (level: unknown): boolean => typeof level === 'number' && Number.isFinite(level),
    );
  }
}
