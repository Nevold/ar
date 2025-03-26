import { disabledRaceButton } from '../shared/utils';
import { updateGaragePage } from '../view/update-garage/update-garage';

export function setFlippedGarage(): void {
  let numberPages = 1;
  document.body.addEventListener('click', event => {
    const element = event.target as HTMLElement;
    disabledRaceButton(element);
    switch (true) {
      case element.classList.contains('next-btn'):
        numberPages++;
        updateGaragePage(numberPages);
        break;

      case element.classList.contains('prev-btn') && numberPages > 1:
        numberPages--;
        updateGaragePage(numberPages);
        break;

      default:
        break;
    }
  });
}
