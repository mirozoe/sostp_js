import { useCallback, useEffect } from 'react';
import type { GameSnapshot, UpgradeType } from '../game/types.ts';
import { ClickerButton } from './ClickerButton.tsx';
import { CoinCounter } from './CoinCounter.tsx';
import { Shop } from './Shop.tsx';
import { useGameEngine, useGameState } from './useGameState.ts';

/**
 * ============================================================================
 *  KOŘENOVÁ KOMPONENTA
 * ============================================================================
 *
 *  Zapamatuj si, co tu NENÍ: žádný výpočet ceny, žádné přičítání mincí,
 *  žádné `setInterval`. Veškerá pravidla hry sedí v `GameEngine`.
 *  React se tu stará výhradně o zobrazení a o reakci na kliknutí.
 */
export function App(): React.JSX.Element {
  /** Data ze Singletonu, doručená přes Observer. */
  const state: GameSnapshot = useGameState();
  const engine = useGameEngine();

  /**
   * `useEffect` s prázdným polem závislostí = spustí se jednou po
   * prvním vykreslení. Tady rozjedeme hru.
   */
  useEffect((): (() => void) => {
    engine.load(); // obnovení uloženého postupu
    engine.startLoop(); // spuštění herní smyčky

    /**
     * ÚKLIDOVÁ FUNKCE – React ji zavolá při odmountování komponenty.
     *
     * Bez ní by `setInterval` běžel dál i po zavření hry. Ve vývoji
     * s hot-reloadem by se smyčky hromadily a hráč by nesmyslně bohatl.
     * Každý `setInterval` musí mít svůj `clearInterval`.
     */
    return (): void => {
      engine.save();
      engine.stopLoop();
    };
  }, [engine]);

  /**
   * `useCallback` udrží stejnou referenci funkce mezi rendery.
   * Bez něj by `ClickerButton` dostal pokaždé novou funkci a zbytečně
   * se překresloval.
   */
  const handleClick = useCallback((): void => {
    engine.click();
  }, [engine]);

  const handleBuy = useCallback(
    (type: UpgradeType): void => {
      engine.buyUpgrade(type);
    },
    [engine],
  );

  const handleReset = useCallback((): void => {
    // `confirm` je tu záměrně – smazání postupu musí hráč potvrdit.
    if (window.confirm('Opravdu smazat celý postup a začít od nuly?')) {
      engine.reset();
    }
  }, [engine]);

  return (
    <div className="app">
      <div className="app__glow" aria-hidden="true" />

      <main className="app__content">
        <h1 className="app__title">
          Crypto<span className="app__title-accent">Clicker</span>
        </h1>

        <CoinCounter
          coins={state.coins}
          coinsPerClick={state.coinsPerClick}
          coinsPerSecond={state.coinsPerSecond}
          totalClicks={state.totalClicks}
        />

        <ClickerButton coinsPerClick={state.coinsPerClick} onClick={handleClick} />

        <Shop upgrades={state.upgrades} onBuy={handleBuy} />

        <footer className="app__footer">
          <button type="button" className="app__reset" onClick={handleReset}>
            Restartovat hru
          </button>
          <p className="app__note">
            Hra se ukládá automaticky každých 10 sekund. Postavená na OOP, vzorech Singleton,
            Factory Method a Observer.
          </p>
        </footer>
      </main>
    </div>
  );
}
