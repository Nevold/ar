import { updateWinnerPage } from '../view/winners-pages/update-winners';

export function sortWinners(): void {
  let sortCall = { page: 1, limit: 10, sort: 'id', order: 'ASC' };
  const flags = {
    name: false,
    wins: false,
    time: false
  };

  document.body.addEventListener('click', event => {
    const element = event.target as HTMLElement;
    switch (true) {
      case element.classList.contains('table-name'):
        flags.name
          ? (sortCall = { ...sortCall, sort: 'id', order: 'ASC' })
          : (sortCall = { ...sortCall, sort: 'id', order: 'DESC' });
        flags.name = !flags.name;
        break;

      case element.classList.contains('table-wins'):
        flags.wins
          ? (sortCall = { ...sortCall, sort: 'wins', order: 'DESC' })
          : (sortCall = { ...sortCall, sort: 'wins', order: 'ASC' });
        flags.wins = !flags.wins;
        break;

      case element.classList.contains('table-time'):
        flags.time
          ? (sortCall = { ...sortCall, sort: 'time', order: 'DESC' })
          : (sortCall = { ...sortCall, sort: 'time', order: 'ASC' });
        flags.time = !flags.time;
        break;

      default:
        break;
    }
    if (
      element.classList.contains('table-time') ||
      element.classList.contains('table-wins') ||
      element.classList.contains('table-name')
    ) {
      updateWinnerPage(sortCall.page, sortCall.limit, sortCall.sort, sortCall.order);
    }
  });
}
