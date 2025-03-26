import { StorageService } from '../../services/local-storage.service';
import { Utils } from '../../shared/utils/utils';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class Options {
  public static readonly list = (): NodeType => {
    StorageService.getData();

    Nodes.childrenList = StorageService.data.list.map(node => this.li(node.id, node.title, node.weight));
    Nodes.listNode.append(...Nodes.childrenList);
    return Nodes.listNode;
  };

  public static readonly label = (value: string): NodeType => {
    const labelIntanceValue = new BaseComponent('label', 'label', value);
    labelIntanceValue.setAttributes({ for: `option-${value}` });
    return labelIntanceValue.getNode();
  };

  public static readonly inputTitle = (value: string, title: string = ''): NodeType => {
    const inputIntanceValue = new BaseComponent('title', 'input');
    inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Title', value: title });
    inputIntanceValue.getNode().addEventListener('input', eventInput => {
      if (eventInput.target instanceof HTMLInputElement) {
        const id = inputIntanceValue.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const currentElementArray = StorageService.data.list.find(element => element.id === idValue);
          if (currentElementArray) {
            currentElementArray.title = eventInput.target.value;
            const storageData = {
              list: [...StorageService.data.list.filter(element => element.id !== idValue), currentElementArray],
              lastId: StorageService.data.lastId
            };
            StorageService.saveData(Utils.sortById(storageData));
          }
        }
      }
    });
    return inputIntanceValue.getNode();
  };

  public static readonly inputWeight = (value: string, weight: string = ''): NodeType => {
    const inputIntanceValue = new BaseComponent('weight', 'input');
    inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Weight', type: 'number', value: weight });
    inputIntanceValue.getNode().addEventListener('input', eventInput => {
      if (eventInput.target instanceof HTMLInputElement) {
        const id = inputIntanceValue.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const currentElementArray = StorageService.data.list.find(element => element.id === idValue);
          if (currentElementArray) {
            currentElementArray.weight = eventInput.target.value;
            const storageData = {
              list: [...StorageService.data.list.filter(element => element.id !== idValue), currentElementArray],
              lastId: StorageService.data.lastId
            };
            StorageService.saveData(Utils.sortById(storageData));
          }
        }
      }
    });
    return inputIntanceValue.getNode();
  };

  public static readonly buttonDelete = (value: string): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Delete');
    buttonIntanceValue.setAttributes({ id: `option-${value}`, type: 'button' });
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();
        const id = event.target.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const listOptions = StorageService.data.list.filter(element => element.id !== idValue);

          const storageData = {
            list: listOptions,
            lastId: listOptions.length === 0 ? 0 : StorageService.data.lastId
          };
          StorageService.data = Utils.sortById(storageData);
          StorageService.saveData(Utils.sortById(storageData));
          event.target.parentElement?.remove();
        }
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly addOptionButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Add Option');

    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();
        const nextIdElement = StorageService.data.lastId + 1;
        StorageService.data.list.push({ id: `#${nextIdElement}`, title: '', weight: '' });
        const storageData = {
          list: StorageService.data.list,
          lastId: nextIdElement
        };
        StorageService.data = Utils.sortById(storageData);
        StorageService.saveData(Utils.sortById(storageData));
        Nodes.listNode.append(this.li(`#${nextIdElement}`));
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly li = (id: string, title: string = '', weight: string = ''): NodeType => {
    const liIntanceValue = new BaseComponent('option', 'li');
    liIntanceValue
      .getNode()
      .append(this.label(id), this.inputTitle(id, title), this.inputWeight(id, weight), this.buttonDelete(id));
    return liIntanceValue.getNode();
  };

  public static readonly loadListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Load list from file');

    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();
        Nodes.loadInputNode.click();
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly loadInput = (): NodeType => {
    Nodes.loadInputNode.hidden = true;
    Nodes.loadInputNode.setAttribute('type', 'file');
    Nodes.loadInputNode.setAttribute('accept', '.json');
    Nodes.loadInputNode.addEventListener('change', event => {
      if (event.target && event.target instanceof HTMLInputElement) {
        event.stopPropagation();

        const input = event.target;

        if (!input.files || input.files.length === 0) {
          throw new Error('File not selected');
        }
        const file = input.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', eventLoad => {
          try {
            let result: string = '';
            if (typeof result !== 'string') {
              throw new TypeError('Unsupported file format');
            } else if (eventLoad.target && typeof eventLoad.target.result === 'string') {
              result = JSON.parse(eventLoad.target.result);
            }

            if (StorageService.isDatabase(result)) {
              StorageService.data = Utils.sortById(result);
              StorageService.saveData(Utils.sortById(result));

              this.replaceChildren();
            }
          } catch (error) {
            if (typeof error === 'string') {
              throw new TypeError(error.toUpperCase());
            } else if (error instanceof Error) {
              throw new TypeError(error.message);
            }
          }
        });

        reader.readAsText(file, 'ascii');
        input.value = '';
      }
    });

    return Nodes.loadInputNode;
  };

  public static readonly saveListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Save list to file');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();

        StorageService.getData();
        const jsonString = JSON.stringify(StorageService.data, undefined, 2);

        const blob = new Blob([jsonString], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'option-list';

        document.body.append(link);
        link.click();

        link.remove();
        URL.revokeObjectURL(url);
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly wrapper = (): NodeType => {
    const wrapperIntanceValue = new BaseComponent('wrapper', 'div');
    wrapperIntanceValue.getNode().append(this.saveListButton(), this.loadListButton(), this.loadInput());
    return wrapperIntanceValue.getNode();
  };

  public static readonly replaceChildren = (): void => {
    Nodes.listNode.replaceChildren();
    Nodes.childrenList = StorageService.data.list.map(node => this.li(node.id, node.title, node.weight));
    Nodes.listNode.append(...Nodes.childrenList);
  };
}
