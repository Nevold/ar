import { Nodes } from '../../components/nodes';
import type { Database } from '../../types/types';

export class Utils {
  public static sortById(data: Database): Database {
    data.list.sort((a, b) => {
      const firstId = Number(a.id.split('#').pop());
      const secondId = Number(b.id.split('#').pop());
      return firstId - secondId;
    });
    return data;
  }

  public static readonly setDisabled = (isDisabled: boolean): void => {
    if (
      Nodes.backButtonNodePicker instanceof HTMLButtonElement &&
      Nodes.soundButtonNode instanceof HTMLButtonElement &&
      Nodes.startPickButtonNode instanceof HTMLButtonElement &&
      Nodes.inputDurationNode instanceof HTMLInputElement
    ) {
      Nodes.backButtonNodePicker.disabled = isDisabled;
      Nodes.soundButtonNode.disabled = isDisabled;
      Nodes.startPickButtonNode.disabled = isDisabled;
      Nodes.inputDurationNode.disabled = isDisabled;
    }
  };
}
