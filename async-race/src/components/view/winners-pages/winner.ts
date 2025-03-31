import CarServices from '../../api-services/car-services';
import type { IWinnerCar } from '../../types/types';
import { carImg } from '../render-car-img/car-img';

export async function renderWinners(item: IWinnerCar[], count: string | null, numberPages: number): Promise<string> {
  const winnerList = await Promise.all(
    item.map(async element => {
      const carResult = await CarServices.getCar(element.id);
      const { name, color } = carResult.data;
      return { ...element, name, color };
    })
  );
  const winnersPageList = winnerList
    .map(
      (car, index) =>
        `<tr>
      <td>${index + 1}</td>
      <td> ${carImg(car.color)}</td>
      <td>${car.name}</td>
      <td>${car.wins}</td>
      <td>${car.time}</td>
    </tr>`
    )
    .join('');
  return `
    <h1 class="winner-logo">Winners ${count}</h1>
    <h2>Page# ${numberPages}</h2>
    <table class="table">
      <thead id="thead">
        <th>Number</th>
        <th>Cars</th>
        <th class="table-button table-name" id="sort-name">Name</th>
        <th class="table-button table-wins" id="sort-wins">Wins</th>
        <th class="table-button table-time" id="sort-time">Best time</th>
        <tbody>
        ${winnersPageList}
        </tbody>
      </thead>
    </table>
      `;
}
