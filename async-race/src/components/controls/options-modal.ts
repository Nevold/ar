import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class OptionsModal {
  public static readonly wrapperNode = new BaseComponent('wrapper-options-modal', 'div').getNode();

  public static readonly textFirst = new BaseComponent(
    'warning',
    'p',
    'Please enter two valid options where the title is not empty and its weight is greater than 0'
  ).getNode();

  public static readonly closeOptionsButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'close-button'], 'button', 'close');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target) {
        event.stopPropagation();
        event.preventDefault();
        this.closeDialog();
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly dialog = (): NodeType => {
    this.wrapperNode.append(this.textFirst, this.closeOptionsButton());
    Nodes.dialogOptionsNode.append(this.wrapperNode);
    Nodes.dialogOptionsNode.addEventListener('click', event => {
      if (event.target === Nodes.dialogOptionsNode) {
        this.closeDialog();
      }
    });

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && Nodes.dialogOptionsNode instanceof HTMLDialogElement) {
        this.closeDialog();
      }
    });
    return Nodes.dialogOptionsNode;
  };

  public static readonly closeDialog = (): void => {
    document.body.classList.remove('no-scroll');
    if (Nodes.dialogOptionsNode instanceof HTMLDialogElement) {
      Nodes.dialogOptionsNode.close();
      this.wrapperNode.replaceChildren();
      Nodes.dialogOptionsNode.replaceChildren();
      Nodes.dialogOptionsNode.remove();
    }
  };
}
