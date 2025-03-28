import { renderWinners } from './winner';
import WinnersServices from '../../api-services/winners-services';

export async function updateWinnerPage(numberPages = 1, limit = 10, sort = 'id', order = 'ASC'): Promise<void> {
  const rootWinner = document.getElementById('winner');
  const { item, count } = await WinnersServices.getWinners(numberPages, limit, sort, order);
  if (rootWinner) rootWinner.innerHTML = await renderWinners(item, count, numberPages);
}
