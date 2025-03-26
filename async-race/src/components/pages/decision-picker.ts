import { HashRouter } from '../../services/router.service';
import { Constants } from '../../shared/constants';
import type { NodeType } from '../../types/types';
import { TimedRotatingCircle } from '../controls/canvas';
import { Nodes } from '../nodes';

export class DecisionPicker {
  public static durationTime = 5;

  public static readonly backButton = (): NodeType => {
    Nodes.backButtonNodePicker.addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        HashRouter.navigateTo('/');
      }
    });

    return Nodes.backButtonNodePicker;
  };

  public static readonly soundButton = (): NodeType => {
    const isValueChecked = localStorage.getItem('isValueCheck');

    if (isValueChecked && JSON.parse(isValueChecked) === true) {
      Nodes.soundButtonNode.classList.add('sound-input');
      Nodes.soundButtonNode.textContent = 'Sound on';
    } else {
      Nodes.soundButtonNode.classList.remove('sound-input');
    }

    Nodes.soundButtonNode.addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopImmediatePropagation();
        event.preventDefault();

        event.target.classList.toggle('sound-input');
        if (Nodes.soundButtonNode.classList.contains('sound-input')) {
          localStorage.setItem('isValueCheck', 'true');
          Nodes.soundButtonNode.textContent = 'Sound on';
        } else {
          localStorage.setItem('isValueCheck', 'false');
          Nodes.soundButtonNode.textContent = 'Sound off';
        }
      }
    });

    return Nodes.soundButtonNode;
  };

  public static readonly startPickButton = (): NodeType => {
    Nodes.startPickButtonNode.addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        if (Nodes.canvas instanceof HTMLCanvasElement) {
          const circle = new TimedRotatingCircle(Nodes.canvas, this.durationTime * 1000, Constants.SECTOR_TEMP);
          circle.startAnimation();
        }
      }
    });

    return Nodes.startPickButtonNode;
  };

  public static readonly inputDuration = (): NodeType => {
    Nodes.inputDurationNode.setAttribute('min', '5');
    Nodes.inputDurationNode.setAttribute('placeholder', 'sec');
    Nodes.inputDurationNode.setAttribute('type', 'number');
    Nodes.inputDurationNode.setAttribute('value', '7');
    Nodes.inputDurationNode.addEventListener('input', event => {
      if (event.target && event.target instanceof HTMLInputElement) {
        this.durationTime = Number(event.target.value);
      }
    });

    return Nodes.inputDurationNode;
  };

  public static readonly canvas = (): NodeType => {
    Nodes.canvas.setAttribute('width', Constants.SIZE);
    Nodes.canvas.setAttribute('height', Constants.SIZE);

    if (Nodes.canvas instanceof HTMLCanvasElement) {
      const circle = new TimedRotatingCircle(Nodes.canvas, this.durationTime * 1000, Constants.SECTOR_TEMP);
      circle.draw();
    }
    return Nodes.canvas;
  };

  public static readonly start = (): void => {
    Nodes.labelDurationNode.textContent = 'Time';
    Nodes.labelDurationNode.append(this.inputDuration());
    Nodes.formPickNode.append(this.backButton(), this.soundButton(), Nodes.labelDurationNode, this.startPickButton());
    Nodes.main.append(Nodes.h1, Nodes.formPickNode, this.canvas());
  };
}
