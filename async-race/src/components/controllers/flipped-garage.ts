import CarServices from '../api-services/car-services';
import { Constants } from '../shared/constants';
import { disabledRaceButton } from '../shared/utils';
import { updateGaragePage } from '../view/update-garage/update-garage';

export function setFlippedGarage(): void {
  let numberPages = 1;
  document.body.addEventListener('click', async event => {
    const element = event.target as HTMLElement;
    disabledRaceButton(element);

    try {
      switch (true) {
        case element.classList.contains('next-btn'): {
          const carsList = await CarServices.getCars(numberPages);
          if (carsList?.count && Number(carsList?.count) > Constants.CAR_LIMIT_PAGE) {
            numberPages += 1;
            await updateGaragePage(numberPages);
          }
          break;
        }

        case element.classList.contains('prev-btn') && numberPages > 1: {
          numberPages -= 1;
          await updateGaragePage(numberPages);
          break;
        }

        default: {
          break;
        }
      }
    } catch (error) {
      console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
    }
  });
}
