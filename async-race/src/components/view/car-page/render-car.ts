import type { ICar } from '../../types/types';
import { carImg } from '../render-car-img/car-img';

export function renderCar(car: ICar): string {
  return `
    <div class="control-button">
      <button class="button select-car" id="select-car-${car.id}">Select</button>
      <button class="button remove-car" id="remove-car-${car.id}">Remove</button>
      <span class="car-name"> ${car.name}</span>
    </div>
    <div class="road">
      <div class="launch-panel">
        <button class="button icon start-icon active-icon" id="start-car-${car.id}">A</button>
        <button class="button icon stop-icon" id="stop-car-${car.id}" disabled>B</button>
      </div>
      <div class="flag" id="flag-${car.id}">🏁</div>
      <div class="car" id="car-${car.id}">
      ${carImg(car.color)}
      </div>
    </div>
   `;
}
