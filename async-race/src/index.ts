import { Options } from './components/controls/options';
import { Nodes } from './components/nodes';
import { DecisionPicker } from './components/pages/decision-picker';
import { ListOfOptions } from './components/pages/list-of-options';
import { NotFound } from './components/pages/not-found';
import './global.css';
import { StorageService } from './services/local-storage.service';
import { HashRouter } from './services/router.service';

document.addEventListener('DOMContentLoaded', () => {
  if (!globalThis.location.hash) {
    globalThis.location.hash = '#/';
  }

  document.body.append(Nodes.main);

  HashRouter.start();

  HashRouter.addRoute('/', () => {
    Nodes.main.replaceChildren();
    Options.list().replaceChildren();
    ListOfOptions.start();
  });

  HashRouter.addRoute('/decision-picker', () => {
    StorageService.getData();
    const isRule = StorageService.data.list.filter(element => element.title !== '' && +element.weight > 0).length >= 2;

    if (isRule) {
      Nodes.labelDurationNode.replaceChildren();
      Nodes.soundButtonNode.remove();
      Nodes.formPickNode.replaceChildren();
      Nodes.main.replaceChildren();
      DecisionPicker.start();
    } else {
      HashRouter.navigateTo('/');
    }
  });

  HashRouter.setNotFound(() => {
    Nodes.main.replaceChildren();
    NotFound.start();
  });
});
