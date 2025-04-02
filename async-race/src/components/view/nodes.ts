import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly dialogListNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly dialogOptionsNode = new BaseComponent('dialog', 'dialog').getNode();

  public static childrenList: NodeType[] = [];

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
}
