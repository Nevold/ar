import { Buttons } from '../controls/buttons';
import { Options } from '../controls/options';
import { Nodes } from '../nodes';

export class ListOfOptions {
  public static readonly start = (): void => {
    Nodes.main.append(
      Nodes.h1,
      Options.list(),
      Options.addOptionButton(),
      Buttons.pasteListButton(),
      Buttons.clearListButton(),
      Options.wrapper(),
      Buttons.startButton()
    );
  };
}
