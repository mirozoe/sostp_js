import botnetIcon from '../../public/images/botnet.svg';
import coinIcon from '../../public/images/coin.svg';
import dysonSphereIcon from '../../public/images/dyson-sphere.svg';
import energyDrinkIcon from '../../public/images/energy-drink.svg';
import farmIcon from '../../public/images/farm.svg';
import gpuIcon from '../../public/images/gpu.svg';
import quantumIcon from '../../public/images/quantum.svg';
import type { UpgradeType } from './types.ts';

/**
 * ============================================================================
 *  MAPA IKON – typově zajištěné adresování obrázků
 * ============================================================================
 *
 *  `Record<UpgradeType, string>` je tu klíčový. Znamená: „objekt, který
 *  MUSÍ mít klíč pro každou hodnotu z `UpgradeType`".
 *
 *  Zkus přidat do `UpgradeType` sedmé vylepšení a neuvést ho tady –
 *  kompilátor okamžitě zaprotestuje. Nikdy tak nemůže vzniknout vylepšení
 *  bez obrázku.
 *
 *  Tohle je přesně ten rozdíl mezi „typovaně" a „magickými řetězci":
 *  s `Record<string, string>` by chyba prošla a projevila by se až
 *  rozbitou ikonou ve hře.
 */
export const UPGRADE_ICONS: Readonly<Record<UpgradeType, string>> = {
  energyDrink: energyDrinkIcon,
  gpu: gpuIcon,
  farm: farmIcon,
  botnet: botnetIcon,
  quantum: quantumIcon,
  dysonSphere: dysonSphereIcon,
};

/** Ikona hlavní mince na klikacím tlačítku. */
export const COIN_ICON: string = coinIcon;
