// import { getCars } from '../../shared/api';
import { renderGarage } from '../garage-page/render-garage';
import CarServices from '../../api-services/car-services';

export async function updateGaragePage(numberPages = 1): Promise<void> {
  const rootGarage = document.querySelector('#garage');
  const carsList = await CarServices.getCars(numberPages);
  if (carsList) {
    const { item, count } = carsList;
    if (rootGarage) {
      rootGarage.innerHTML = renderGarage(item, count, numberPages);
    }
  }
}
