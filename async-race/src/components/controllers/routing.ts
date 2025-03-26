import { updateWinnerPage } from '../view/winners-pages/update-winners';

export function routing(): void {
  const garageControl = document.getElementById('garage-menu');
  const winnerControl = document.getElementById('winner-menu');
  const garagePage = document.getElementById('garage-page');
  const winnerPage = document.getElementById('winner');
  const btnList = document.getElementById('prev');

  garageControl?.addEventListener('click', () => {
    garageControl?.classList.add('active-button');
    winnerControl?.classList.remove('active-button');
    garagePage?.classList.remove('disable-page');
    winnerPage?.classList.add('disable-page');
    btnList?.classList.remove('winners-page');
    btnList?.nextElementSibling?.classList.remove('winners-page');
  });

  winnerControl?.addEventListener('click', () => {
    garageControl?.classList.remove('active-button');
    winnerControl?.classList.add('active-button');
    garagePage?.classList.add('disable-page');
    winnerPage?.classList.remove('disable-page');
    btnList?.classList.add('winners-page');
    btnList?.nextElementSibling?.classList.add('winners-page');
    updateWinnerPage();
  });
}
