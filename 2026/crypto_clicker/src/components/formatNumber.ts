/**
 * Formátování velkých čísel.
 *
 * V clicker hrách čísla rychle utečou do miliard a „1247891233" nikdo
 * nepřečte. Proto zkracujeme na „1.25B".
 *
 * Pomocné funkce nejsou součástí OOP jádra – jsou to čisté funkce
 * (stejný vstup → stejný výstup, žádné vedlejší efekty). Dělat z nich
 * třídu by bylo zbytečné; ne všechno musí být objekt.
 */

interface Suffix {
  readonly value: number;
  readonly symbol: string;
}

const SUFFIXES: readonly Suffix[] = [
  { value: 1e12, symbol: 'T' },
  { value: 1e9, symbol: 'B' },
  { value: 1e6, symbol: 'M' },
  { value: 1e3, symbol: 'K' },
];

/** Zformátuje číslo do čitelné podoby (např. 1234567 → „1.23M"). */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return '0';
  }

  const abs: number = Math.abs(value);

  if (abs < 1000) {
    return Math.floor(value).toString();
  }

  for (const suffix of SUFFIXES) {
    if (abs >= suffix.value) {
      const scaled: number = value / suffix.value;
      // Dvě desetinná místa u menších čísel, jedno u větších.
      const digits: number = scaled < 100 ? 2 : 1;
      return `${scaled.toFixed(digits)}${suffix.symbol}`;
    }
  }

  return Math.floor(value).toString();
}

/** Formát pro příjem za sekundu – u malých hodnot chceme desetinné místo. */
export function formatRate(value: number): string {
  if (value < 10 && value > 0) {
    return value.toFixed(1);
  }
  return formatNumber(value);
}
