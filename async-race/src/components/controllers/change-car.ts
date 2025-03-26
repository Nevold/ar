import CarServices from '../api-services/CarServices';
import WinnersServices from '../api-services/WinnersServices';
import { disabledRaceButton, generateCars } from '../shared/utils';
import { updateGaragePage } from '../view/update-garage/update-garage';

export function changeCar(): void {
  let id: number;
  document.body.addEventListener('click', async event => {
    const element = event.target as HTMLElement;
    const elementUpdateName = document.querySelector('.update-name') as HTMLInputElement;
    const elementUpdateColor = document.querySelector('.update-color') as HTMLInputElement;
    const elementInputName = document.querySelector('.create-name') as HTMLInputElement;
    const elementInputColor = document.querySelector('.create-color') as HTMLInputElement;
    disabledRaceButton(element);

    switch (true) {
      case element.classList.contains('remove-car'):
        id = Number(element.id.split('remove-car-').pop());
        await CarServices.deleteCar(id);
        if ((await WinnersServices.getWinners()).item.filter(elem => elem.id === id).length !== 0) {
          await WinnersServices.deleteWinnerCar(id);
        }
        await updateGaragePage();
        break;

      case element.classList.contains('create-submit'):
        event.preventDefault();
        await CarServices.createCar(elementInputName.value, elementInputColor.value);
        await updateGaragePage();
        elementInputName.value = '';
        elementUpdateColor.value = '#ffffff';
        break;

      case element.classList.contains('select-car'):
        id = Number(element.id.split('select-car-').pop());
        const { name, color } = (await CarServices.getCar(id)).data;
        document.querySelector('.update-submit')?.classList.add('update-flag');
        elementUpdateColor.value = color;
        elementUpdateName.value = name;
        elementUpdateName.disabled = false;
        elementUpdateColor.disabled = false;
        break;

      case element.classList.contains('update-flag'):
        event.preventDefault();
        await CarServices.updateCar(id, elementUpdateName.value, elementUpdateColor.value);
        await updateGaragePage();
        elementUpdateName.disabled = true;
        elementUpdateColor.disabled = true;
        elementUpdateName.value = '';
        elementUpdateColor.value = '#ffffff';
        element.classList.remove('update-flag');
        break;

      case element.classList.contains('update-submit'):
        event.preventDefault();
        break;

      case element.classList.contains('generate'):
        const arrCars = generateCars();
        const promises = arrCars.map(elem => CarServices.createCar(elem.name, elem.color));
        await Promise.allSettled(promises);
        await updateGaragePage();
        break;

      default:
        break;
    }
  });
}
