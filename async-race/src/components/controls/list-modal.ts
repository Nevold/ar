import { StorageService } from '../../services/local-storage.service';
import { Constants } from '../../shared/constants';
import { Utils } from '../../shared/utils/utils';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';
import { Options } from './options';

export class Modal {
  public static readonly textareaNode = new BaseComponent('textarea', 'textarea').getNode();

  public static readonly formNode = new BaseComponent('container', 'form').getNode();

  public static readonly textarea = (): NodeType => {
    if (this.textareaNode instanceof HTMLTextAreaElement) {
      this.textareaNode.rows = Constants.ROWS;
      this.textareaNode.cols = Constants.COLS;
      this.textareaNode.placeholder = 'Paste a list of new options in a CSV-like format';
    }
    return this.textareaNode;
  };

  public static readonly cancel = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'cancel'], 'button', 'Cancel');
    this.closeDialog(buttonIntanceValue);
    return buttonIntanceValue.getNode();
  };

  public static readonly confirm = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'confirm'], 'button', 'Confirm');

    buttonIntanceValue.getNode().addEventListener('click', () => {
      if (this.formNode instanceof HTMLFormElement && this.formNode.elements[0] instanceof HTMLTextAreaElement) {
        const arrayValue = this.formNode.elements[0].value
          .split('\n')
          .filter(Boolean)
          .map(element => element.trim());
        const optionsList = arrayValue
          .map(element => element.split(','))
          .map(value => {
            if (value.length > 2) {
              const lastElement = value.at(-1);
              const arrayWithoutLast = value.slice(0, -1);
              return [arrayWithoutLast.join(','), lastElement];
            }
            return value;
          })
          .map(element => element.map(item => item?.trim()))
          .filter(element => Number(element[1]));
        StorageService.getData();
        const storageOptionsList = optionsList.map((item, index) => {
          if (item[0] && item[1]) {
            return {
              id: `#${StorageService.data.lastId + index + 1}`,
              title: item[0],
              weight: item[1]
            };
          }
          return item;
        });
        const storageData = {
          list: [...StorageService.data.list, ...storageOptionsList],
          lastId: StorageService.data.lastId + storageOptionsList.length
        };
        if (StorageService.isDatabase(storageData)) {
          StorageService.data = Utils.sortById(storageData);
          StorageService.saveData(Utils.sortById(storageData));

          Options.replaceChildren();

          this.formNode.elements[0].value = '';
        }
      }
    });

    this.closeDialog(buttonIntanceValue);
    return buttonIntanceValue.getNode();
  };

  public static readonly form = (): NodeType => {
    this.formNode.append(this.textarea(), this.cancel(), this.confirm());
    return this.formNode;
  };

  public static readonly dialog = (): NodeType => {
    Nodes.dialogListNode.append(this.form());
    Nodes.dialogListNode.addEventListener('click', event => {
      if (event.target === Nodes.dialogListNode && Nodes.dialogListNode instanceof HTMLDialogElement) {
        Nodes.dialogListNode.close();
        this.clearDialog();
      }
    });

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && Nodes.dialogListNode instanceof HTMLDialogElement) {
        Nodes.dialogListNode.close();
        this.clearDialog();
      }
    });
    return Nodes.dialogListNode;
  };

  public static readonly clearDialog = (): void => {
    document.body.classList.remove('no-scroll');
    if (
      Nodes.dialogListNode instanceof HTMLDialogElement &&
      this.formNode instanceof HTMLFormElement &&
      this.formNode.elements[0] instanceof HTMLTextAreaElement
    ) {
      this.formNode.elements[0].value = '';
      this.formNode.replaceChildren();
      Nodes.dialogListNode.replaceChildren();
      Nodes.dialogListNode.remove();
    }
  };

  private static readonly closeDialog = (buttonIntanceValue: BaseComponent): void => {
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (
        event.target &&
        event.target instanceof HTMLButtonElement &&
        Nodes.dialogListNode instanceof HTMLDialogElement
      ) {
        event.stopPropagation();
        event.preventDefault();
        Nodes.dialogListNode.close();
        this.clearDialog();
      }
    });
  };
}
