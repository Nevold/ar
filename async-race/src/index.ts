import App from './components/app/app';
import { Nodes } from './components/view/nodes';
import './style.css';

try {
  await App.start();
} catch (error) {
  console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
}

// console.log('%c Score:190/190', 'background: #222; color: #bada55');
// console.log('%c ALL TASKS COMPLETED!', 'background: #222; color: #bada55');

console.log(Nodes.garageMenuButton);
