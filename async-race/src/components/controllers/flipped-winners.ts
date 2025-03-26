import { updateWinnerPage } from '../view/winners-pages/update-winners';

export function setFlippedWinners(): void {
  let numberPages = 1;
  document.body.addEventListener('click', event => {
    const element = event.target as HTMLElement;
    switch (true) {
      case element.classList.contains('next-btn') && element.classList.contains('winners-page'):
        numberPages++;
        updateWinnerPage(numberPages);
        break;

      case element.classList.contains('prev-btn') && element.classList.contains('winners-page') && numberPages > 1:
        numberPages--;
        updateWinnerPage(numberPages);
        break;

      default:
        break;
    }
  });
}
