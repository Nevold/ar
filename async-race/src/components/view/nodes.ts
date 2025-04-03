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
}
