import type { UpgradeSnapshot, UpgradeType } from '../game/types.ts';
import { formatNumber } from './formatNumber.ts';

interface UpgradeCardProps {
  readonly upgrade: UpgradeSnapshot;
  readonly onBuy: (type: UpgradeType) => void;
}

/**
 * Karta jednoho vylepšení v obchodě.
 *
 * Komponenta netuší, jestli za snímkem stojí `GpuUpgrade` nebo
 * `DysonSphereUpgrade`. Pracuje jen s daty `UpgradeSnapshot` – a právě
 * díky tomu můžeš do hry přidat desáté vylepšení bez jediné změny v UI.
 */
export function UpgradeCard({ upgrade, onBuy }: UpgradeCardProps): React.JSX.Element {
  const { type, name, description, iconPath, level, cost, kind, effectPerLevel, affordable } =
    upgrade;

  // Šablonové řetězce pro podmíněné třídy – čitelnější než knihovny.
  const className = [
    'upgrade',
    affordable ? 'upgrade--affordable' : 'upgrade--locked',
    level > 0 ? 'upgrade--owned' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={className}>
      <button
        type="button"
        className="upgrade__button"
        onClick={(): void => onBuy(type)}
        /*
          `disabled` je dvojí pojistka. Nákup hlídá i engine (`buyUpgrade`
          vrátí `false`), ale zašedlé tlačítko je pro hráče srozumitelnější.
          Pravidlo: UI je nápověda, engine je autorita.
        */
        disabled={!affordable}
      >
        <img src={iconPath} alt="" className="upgrade__icon" />

        <span className="upgrade__body">
          <span className="upgrade__header">
            <span className="upgrade__name">{name}</span>
            {level > 0 && <span className="upgrade__level">Lv. {level}</span>}
          </span>

          <span className="upgrade__description">{description}</span>

          <span className="upgrade__footer">
            <span className="upgrade__cost">{formatNumber(cost)} ₿</span>
            <span className="upgrade__effect">
              +{formatNumber(effectPerLevel)}
              {kind === 'passive' ? '/s' : ' /klik'}
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}
