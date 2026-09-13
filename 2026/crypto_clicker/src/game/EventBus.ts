/**
 * ============================================================================
 *  NÁVRHOVÝ VZOR: OBSERVER (Pozorovatel)
 * ============================================================================
 *
 *  PROBLÉM, KTERÝ ŘEŠÍ:
 *  Herní logika (`GameEngine`) potřebuje dát vědět uživatelskému rozhraní,
 *  že se něco změnilo. Nejjednodušší řešení by bylo, aby engine přímo
 *  volal React – jenže tím by se herní logika navždy přilepila k Reactu.
 *  Kdybys pak chtěl hru přepsat do Vue nebo pustit na serveru, musel bys
 *  přepisovat i engine.
 *
 *  JAK TO FUNGUJE:
 *  Engine si drží seznam „posluchačů" (observers). Neví, kdo to je ani
 *  co dělají – zná jen funkci, kterou má zavolat. Když se stav změní,
 *  zavolá je všechny. Posluchač se kdykoli může odhlásit.
 *
 *  VÝSLEDEK: `GameEngine` nezná slovo „React". Závislost jde jen jedním
 *  směrem: React zná engine, engine nezná React.
 */

/** Funkce, kterou zavoláme při každé změně. */
export type Listener = () => void;

/** Funkce vrácená při přihlášení – jejím zavoláním se posluchač odhlásí. */
export type Unsubscribe = () => void;

export class EventBus {
  /**
   * `Set` místo pole – automaticky brání dvojímu přihlášení téhož
   * posluchače a odebírání je rychlé.
   *
   * `readonly` znamená, že proměnnou nelze přepsat jinou kolekcí
   * (obsah Setu měnit lze – to je běžné nedorozumění).
   */
  private readonly listeners = new Set<Listener>();

  /**
   * Přihlásí posluchače k odběru změn.
   *
   * Vrací funkci pro odhlášení. Tenhle vzor („subscribe vrací unsubscribe")
   * je běžný v celém JS světě a React ho přímo očekává – vrácenou funkci
   * použije při odmountování komponenty. Bez odhlašování by vznikaly
   * memory leaky.
   */
  public subscribe(listener: Listener): Unsubscribe {
    this.listeners.add(listener);
    return (): void => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Oznámí všem posluchačům, že došlo ke změně.
   *
   * Iterujeme přes KOPII seznamu (`[...this.listeners]`). Kdyby se totiž
   * některý posluchač během notifikace odhlásil, měnili bychom kolekci,
   * přes kterou zrovna procházíme – a to je klasický zdroj těžko
   * dohledatelných chyb.
   */
  public notify(): void {
    for (const listener of [...this.listeners]) {
      listener();
    }
  }

  /** Počet přihlášených posluchačů – hodí se při ladění. */
  public get listenerCount(): number {
    return this.listeners.size;
  }
}
