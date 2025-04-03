import { renderWinners } from './winner';
import WinnersServices from '../../api-services/winners-services';
import { Nodes } from '../nodes';

export async function updateWinnerPage(numberPages = 1, limit = 10, sort = 'id', order = 'ASC'): Promise<void> {
  const rootWinner = Nodes.winnerPage;
  try {
    const { item, count } = await WinnersServices.getWinners(numberPages, limit, sort, order);

    if (rootWinner) {
      rootWinner.replaceChildren();
      const innerHtml = await renderWinners(item, count, numberPages);
      rootWinner.insertAdjacentHTML('afterbegin', innerHtml);
    }
  } catch (error) {
    console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
  }
}
