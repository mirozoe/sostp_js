/**
 * DEKLARACE MODULŮ PRO OBRÁZKY
 *
 * TypeScript sám o sobě neví, co znamená `import ikona from './gpu.svg'`.
 * Tímhle souborem mu to vysvětlíme: import SVG vrátí `string` s cestou
 * k souboru, kterou bundler doplní při sestavení.
 *
 * PROČ IMPORTOVAT MÍSTO NAPSÁNÍ CESTY RUČNĚ:
 *   • Překlep v cestě odhalí kompilátor, ne až rozbitý obrázek v prohlížeči.
 *   • Bundler přidá do názvu hash obsahu (`gpu-a3f9.svg`), takže po
 *     aktualizaci hry se uživateli nezobrazí stará ikona z cache.
 *   • Nepoužitý obrázek se do výsledného balíčku vůbec nedostane.
 */

declare module '*.svg' {
  const path: string;
  export default path;
}
