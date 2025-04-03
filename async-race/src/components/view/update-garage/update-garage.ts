import { renderGarage } from '../garage-page/render-garage';
import CarServices from '../../api-services/car-services';

export async function updateGaragePage(numberPages = 1): Promise<void> {
  const rootGarage = document.querySelector('#garage');
  try {
    const carsList = await CarServices.getCars(numberPages);
    if (carsList) {
      const { item, count } = carsList;
      if (rootGarage) {
        // rootGarage.innerHTML = renderGarage(item, count, numberPages);
        rootGarage.replaceChildren();
        rootGarage.insertAdjacentHTML('afterbegin', renderGarage(item, count, numberPages));
      }
    }
  } catch (error) {
    console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
  }
}
