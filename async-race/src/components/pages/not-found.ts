import { HashRouter } from '../../services/router.service';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class NotFound {
  public static readonly h1 = new BaseComponent('heading', 'h1', 'Oops! Something went wrong').getNode();

  public static readonly backButton = (): NodeType => {
    Nodes.backButtonNode.addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        HashRouter.navigateTo('/');
      }
    });

    return Nodes.backButtonNode;
  };

  public static readonly start = (): void => {
    Nodes.main.append(this.h1, this.backButton());
  };
}
