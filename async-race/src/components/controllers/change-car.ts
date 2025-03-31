import CarServices from '../api-services/car-services';
import WinnersServices from '../api-services/winners-services';
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

    try {
      switch (true) {
        case element.classList.contains('remove-car'): {
          id = Number(element.id.split('remove-car-').pop());
          await CarServices.deleteCar(id);
          const winnersResult = await WinnersServices.getWinners();
          if (winnersResult.item.some(element_ => element_.id === id)) {
            await WinnersServices.deleteWinnerCar(id);
          }
          await updateGaragePage();
          break;
        }

        case element.classList.contains('create-submit'): {
          event.preventDefault();
          await CarServices.createCar(elementInputName.value, elementInputColor.value);
          await updateGaragePage();
          elementInputName.value = '';
          elementUpdateColor.value = '#ffffff';
          break;
        }

        case element.classList.contains('select-car'): {
          id = Number(element.id.split('select-car-').pop());
          const carResult = await CarServices.getCar(id);
          const { name, color } = carResult.data;
          document.querySelector('.update-submit')?.classList.add('update-flag');
          elementUpdateColor.value = color;
          elementUpdateName.value = name;
          elementUpdateName.disabled = false;
          elementUpdateColor.disabled = false;
          break;
        }

        case element.classList.contains('update-flag'): {
          event.preventDefault();
          await CarServices.updateCar(id, elementUpdateName.value, elementUpdateColor.value);
          await updateGaragePage();
          elementUpdateName.disabled = true;
          elementUpdateColor.disabled = true;
          elementUpdateName.value = '';
          elementUpdateColor.value = '#ffffff';
          element.classList.remove('update-flag');
          break;
        }

        case element.classList.contains('update-submit'): {
          event.preventDefault();
          break;
        }

        case element.classList.contains('generate'): {
          const arrayCars = generateCars();
          const promises = arrayCars.map(element_ => CarServices.createCar(element_.name, element_.color));
          await Promise.allSettled(promises);
          await updateGaragePage();
          break;
        }

        default: {
          break;
        }
      }
    } catch (error) {
      console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
    }
  });
}
