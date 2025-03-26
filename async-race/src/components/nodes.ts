import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly dialogListNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly dialogOptionsNode = new BaseComponent('dialog', 'dialog').getNode();

  public static childrenList: NodeType[] = [];

  public static listNode = new BaseComponent('list', 'ul').getNode();

  public static readonly loadInputNode = new BaseComponent('input', 'input').getNode();

  public static readonly main = new BaseComponent('main', 'div').getNode();

  public static readonly h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

  public static readonly startButtonNode = new BaseComponent('button', 'button', 'Start').getNode();

  public static readonly backButtonNode = new BaseComponent('button', 'button', 'Back to main').getNode();

  public static readonly formPickNode = new BaseComponent('container-pick', 'form').getNode();

  public static readonly labelDurationNode = new BaseComponent('duration-label', 'label', 'Time').getNode();

  public static readonly canvas = new BaseComponent('wheel', 'canvas').getNode();

  public static backButtonNodePicker = new BaseComponent(['button', 'back-button'], 'button', 'Back').getNode();

  public static soundButtonNode = new BaseComponent(['sound', 'button'], 'button', 'Sound off').getNode();

  public static startPickButtonNode = new BaseComponent(['pick-button', 'button'], 'button', 'Start').getNode();

  public static inputDurationNode = new BaseComponent('duration-input', 'input').getNode();
}
