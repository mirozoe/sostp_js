import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App.tsx';
import './style.css';

/**
 * VSTUPNÍ BOD APLIKACE.
 *
 * Jediné místo, kde sáhneme přímo do DOM. Odsud dál už všechno kreslí React.
 */

const container: HTMLElement | null = document.getElementById('root');

/**
 * Kontrola na `null` místo vykřičníku (`document.getElementById('root')!`).
 *
 * Vykřičník znamená „kompilátore, věř mi, není to null". Jenže když se
 * někdo v HTML uklepne v `id`, dostaneš záhadné „Cannot read properties
 * of null". Takhle dostaneš srozumitelnou hlášku.
 */
if (container === null) {
  throw new Error('Element #root nebyl v index.html nalezen.');
}

createRoot(container).render(
  /**
   * `StrictMode` ve vývoji záměrně spouští efekty dvakrát, aby odhalil
   * chybějící úklid. Naše hra to ustojí: `startLoop()` se brání dvojímu
   * spuštění a `useEffect` po sobě uklízí. Kdyby to napsané nebylo,
   * StrictMode by chybu okamžitě odhalil – proto ho nevypínej.
   */
  <StrictMode>
    <App />
  </StrictMode>,
);
