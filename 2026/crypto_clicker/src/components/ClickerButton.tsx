import { useCallback, useRef, useState } from 'react';
import { COIN_ICON } from '../game/icons.ts';
import { formatNumber } from './formatNumber.ts';

interface ClickerButtonProps {
  readonly coinsPerClick: number;
  readonly onClick: () => void;
}

/** Jeden odlétající text „+15" – čistě vizuální záležitost. */
interface FloatingText {
  readonly id: number;
  readonly amount: number;
  readonly offsetX: number;
}

/**
 * Velké klikací tlačítko.
 *
 * DŮLEŽITÉ ROZLIŠENÍ:
 * Komponenta má vlastní `useState`, ale drží v něm POUZE vizuální efekty
 * (odlétající čísla). To není porušení pravidla „logika patří do enginu" –
 * animace není součástí pravidel hry. Kdyby sis uložil hru a načetl ji
 * na jiném počítači, na odlétajících číslech vůbec nezáleží.
 *
 * Herní stav (mince, úrovně) zůstává výhradně v `GameEngine`.
 */
export function ClickerButton({ coinsPerClick, onClick }: ClickerButtonProps): React.JSX.Element {
  const [floatingTexts, setFloatingTexts] = useState<readonly FloatingText[]>([]);

  /**
   * `useRef` pro počítadlo ID.
   *
   * Proč ne `useState`? Změna refu nevyvolá překreslení – a my ho tu
   * nepotřebujeme. Ref je „proměnná, která přežije render".
   */
  const nextId = useRef<number>(0);

  const handleClick = useCallback((): void => {
    // 1) Herní akce – deleguje se na engine.
    onClick();

    // 2) Vizuální efekt – zůstává tady.
    const id: number = nextId.current;
    nextId.current += 1;

    const floating: FloatingText = {
      id,
      amount: coinsPerClick,
      offsetX: Math.random() * 80 - 40, // rozptyl, ať se čísla nepřekrývají
    };

    setFloatingTexts((current: readonly FloatingText[]) => [...current, floating]);

    // Po doběhnutí animace text odstraníme, jinak by jich v DOM
    // přibývaly tisíce a stránka by se zasekla.
    setTimeout((): void => {
      setFloatingTexts((current: readonly FloatingText[]) =>
        current.filter((text: FloatingText): boolean => text.id !== id),
      );
    }, 900);
  }, [coinsPerClick, onClick]);

  return (
    <div className="clicker">
      <button
        type="button"
        className="clicker__button"
        onClick={handleClick}
        aria-label={`Těžit kryptoměnu, získáš ${formatNumber(coinsPerClick)} mincí`}
      >
        <img src={COIN_ICON} alt="" className="clicker__coin" draggable={false} />
      </button>

      <p className="clicker__hint">Klikni na minci a začni těžit</p>

      {/* Vrstva s odlétajícími čísly. `pointer-events: none` v CSS
          zajistí, že nebrání dalšímu klikání. */}
      <div className="clicker__floats" aria-hidden="true">
        {floatingTexts.map((text: FloatingText) => (
          <span
            key={text.id}
            className="clicker__float"
            style={{ '--offset-x': `${text.offsetX}px` } as React.CSSProperties}
          >
            +{formatNumber(text.amount)}
          </span>
        ))}
      </div>
    </div>
  );
}
