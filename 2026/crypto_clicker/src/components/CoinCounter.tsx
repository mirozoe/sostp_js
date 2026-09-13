import { formatNumber, formatRate } from './formatNumber.ts';

/**
 * Props komponenty mají VŽDY vlastní typované rozhraní.
 * Žádné `any` – kompilátor hlídá, že komponentu voláš správně.
 */
interface CoinCounterProps {
  readonly coins: number;
  readonly coinsPerClick: number;
  readonly coinsPerSecond: number;
  readonly totalClicks: number;
}

/**
 * ČISTĚ PREZENTAČNÍ KOMPONENTA.
 *
 * Nemá vlastní stav, neobsahuje herní logiku, nesahá na `GameEngine`.
 * Dostane data přes props a vykreslí je – nic víc.
 *
 * Takové komponenty se snadno testují a snadno používají znovu.
 */
export function CoinCounter({
  coins,
  coinsPerClick,
  coinsPerSecond,
  totalClicks,
}: CoinCounterProps): React.JSX.Element {
  return (
    <header className="counter">
      <p className="counter__label">Tvé jmění</p>

      {/*
        `aria-live="polite"` – čtečka pro nevidomé ohlásí změnu hodnoty.
        Přístupnost není nadstandard, ale součást řemesla.
      */}
      <p className="counter__value" aria-live="polite">
        <span className="counter__amount">{formatNumber(coins)}</span>
        <span className="counter__currency">₿</span>
      </p>

      <dl className="counter__stats">
        <div className="counter__stat">
          <dt>Za klik</dt>
          <dd>{formatNumber(coinsPerClick)}</dd>
        </div>
        <div className="counter__stat">
          <dt>Za sekundu</dt>
          <dd>{formatRate(coinsPerSecond)}</dd>
        </div>
        <div className="counter__stat">
          <dt>Kliknutí</dt>
          <dd>{formatNumber(totalClicks)}</dd>
        </div>
      </dl>
    </header>
  );
}
