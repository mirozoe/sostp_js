import type { UpgradeSnapshot, UpgradeType } from '../game/types.ts';
import { UpgradeCard } from './UpgradeCard.tsx';

interface ShopProps {
  readonly upgrades: readonly UpgradeSnapshot[];
  readonly onBuy: (type: UpgradeType) => void;
}

/**
 * Obchod – seznam všech dostupných vylepšení.
 *
 * Komponenta jen předává data dál. Tomuhle se říká „kontejnerová
 * komponenta": skládá menší kousky dohromady a sama nic nevykresluje.
 */
export function Shop({ upgrades, onBuy }: ShopProps): React.JSX.Element {
  return (
    <section className="shop" aria-labelledby="shop-title">
      <h2 id="shop-title" className="shop__title">
        Obchod
      </h2>

      {/*
        `key` musí být stabilní a jedinečný – React podle něj pozná,
        které položky se změnily. Použití indexu pole je klasická chyba;
        typ vylepšení je tu ideální klíč.
      */}
      <ul className="shop__list">
        {upgrades.map((upgrade: UpgradeSnapshot) => (
          <UpgradeCard key={upgrade.type} upgrade={upgrade} onBuy={onBuy} />
        ))}
      </ul>
    </section>
  );
}
