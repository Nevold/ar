import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly garageMenuButton = new BaseComponent(
    ['button', 'menu-button', 'active-menu-button', 'active-button'],
    'button',
    'To garage',
    { id: 'garage-menu' }
  ).getNode();

  public static readonly winnerMenuButton = new BaseComponent(
    ['button', 'menu-button', 'active-menu-button'],
    'button',
    'To winners',
    { id: 'winner-menu' }
  ).getNode();

  public static readonly winnerGarageWrapper = new BaseComponent('menu', 'div').getNode();

  public static readonly garagePageWrapper = new BaseComponent('', 'div', '', {
    id: 'garage-page'
  }).getNode();

  public static readonly winnerPage = new BaseComponent('disable-page', 'div', '', {
    id: 'winner'
  }).getNode();

  public static readonly paginationWrapper = new BaseComponent('pagination', 'div').getNode();

  public static readonly prevButton = new BaseComponent(['button', 'menu-button', 'prev-btn'], 'button', 'Prev', {
    id: 'prev'
  }).getNode();

  public static readonly nextButton = new BaseComponent(['button', 'menu-button', 'next-btn'], 'button', 'Next', {
    id: 'next'
  }).getNode();
}
