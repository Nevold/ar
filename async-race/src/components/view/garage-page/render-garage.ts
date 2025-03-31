import type { ICar } from '../../types/types';
import { renderCar } from '../car-page/render-car';

export function renderGarage(item: ICar[], count: string | null, numberPages: number): string {
  return `
      <h1>Garage ${count}</h1>
      <h2 class="number-page">Page# ${numberPages}</h2>
      <ul class="garage-list">
        ${item.map(car => `<li>${renderCar(car)}</li>`).join('')}
      </ul>
     `;
}
