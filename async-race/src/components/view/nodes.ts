import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly dialogListNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly dialogOptionsNode = new BaseComponent('dialog', 'dialog').getNode();

  public static childrenList: NodeType[] = [];
}
