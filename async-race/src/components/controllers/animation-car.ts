import { ICar, ISuccessRaceCars } from '../types/types';
import { animation, disableAllControlButton, disabledRaceButton } from '../shared/utils';
import WinnersServices from '../api-services/WinnersServices';
import Constants from '../shared/constants';
import CarServices from '../api-services/CarServices';
import EngineServices from '../api-services/EngineServices';

export function animationCar(): void {
  let id: number;
  let currentCar: HTMLElement | null;
  let arrCars: ICar[] | undefined;
  let numberPage: number;
  const winnerMessage = document.querySelector('.winner-message');

  document.body.addEventListener('click', async event => {
    const page: HTMLElement | null = document.querySelector('.number-page');
    numberPage = Number(page?.innerText.split('Page# ').pop());
    const element = event.target as HTMLElement;
    switch (true) {
      case element.classList.contains('start-icon'):
        id = Number(element.id.split('start-car-').pop());
        currentCar = document.getElementById(`car-${id}`);
        currentCar?.classList.add('in-transit');
        const startBtn = (
          ((currentCar as HTMLElement).previousElementSibling as HTMLElement).previousElementSibling as HTMLElement
        ).firstElementChild as HTMLButtonElement;
        startBtn.disabled = true;
        const { velocity: velocityStart, distance: distanceStart } = (await EngineServices.startEngineCar(id)).data;
        const animationTimeStart = distanceStart / velocityStart;
        animation(currentCar, distanceStart, animationTimeStart, id);
        startBtn.classList.remove('active-icon');
        (startBtn.nextElementSibling as HTMLButtonElement).classList.add('active-icon');
        (startBtn.nextElementSibling as HTMLButtonElement).disabled = false;
        disabledRaceButton(element);
        break;

      case element.classList.contains('stop-icon'):
        id = Number(element.id.split('stop-car-').pop());
        currentCar = document.getElementById(`car-${id}`);
        currentCar?.classList.remove('in-transit');
        const stopBtn = (
          ((currentCar as HTMLElement).previousElementSibling as HTMLElement).previousElementSibling as HTMLElement
        ).lastElementChild as HTMLButtonElement;
        stopBtn.disabled = true;
        const { velocity: velocityStop, distance: distanceStop } = (await EngineServices.stopEngineCar(id)).data;
        const animationTimeStop = distanceStop / velocityStop;
        animation(currentCar, distanceStop, animationTimeStop);
        stopBtn.classList.remove('active-icon');
        (stopBtn.previousElementSibling as HTMLButtonElement).classList.add('active-icon');
        (stopBtn.previousElementSibling as HTMLButtonElement).disabled = false;
        disabledRaceButton(element);
        break;

      case element.classList.contains('race'):
        disableAllControlButton(element);
        arrCars = (await CarServices.getCars(numberPage))?.item;
        const promisesStart = arrCars?.map(async elem => {
          const currentCarStart = document.getElementById(`car-${elem.id}`);
          currentCarStart?.classList.add('in-transit');
          const { velocity: velocityCarStart, distance: distanceCarStart } = (
            await EngineServices.startEngineCar(elem.id)
          ).data;
          const animationTimeRaceStart = distanceCarStart / velocityCarStart;
          const success = animation(currentCarStart, distanceCarStart, animationTimeRaceStart, elem.id);
          return { ...elem, time: Number((animationTimeRaceStart / 1000).toFixed(2)), success };
        });
        (element as HTMLButtonElement).disabled = true;
        element.classList.remove('active-button');

        const currentRaceCars = await Promise.all(promisesStart as unknown[] as ISuccessRaceCars[]);
        const currentRaceCarsTemp = [...currentRaceCars];
        const currentRaceCarsSort = currentRaceCarsTemp.sort((a: ISuccessRaceCars, b: ISuccessRaceCars) =>
          a.time > b.time ? 1 : -1
        );

        const returnFirstFastCar = async (): Promise<ISuccessRaceCars | undefined> => {
          const fastestDriveCar = currentRaceCarsSort.shift();
          const isSuccess = await fastestDriveCar?.success;
          if (isSuccess || currentRaceCarsSort.length === 0) {
            return fastestDriveCar;
          }
          return returnFirstFastCar();
        };

        const winnerCar = await returnFirstFastCar();

        if (winnerCar !== undefined) {
          const WinnerExsist = (await WinnersServices.getWinners()).item.filter(elem => elem.id === winnerCar.id);
          if (WinnerExsist.length === 0) {
            WinnersServices.createWinner(winnerCar.id, Constants.ONE_WIN, winnerCar.time);
          } else {
            const increaseWin = (await WinnersServices.getWinner(winnerCar.id)).data.wins + Constants.ONE_WIN;
            if (WinnerExsist[Constants.FIRST_ELEM_ARRAY].time > winnerCar.time) {
              WinnersServices.updateWinner(winnerCar.id, increaseWin, winnerCar.time);
            } else {
              WinnersServices.updateWinner(winnerCar.id, increaseWin, WinnerExsist[Constants.FIRST_ELEM_ARRAY].time);
            }
          }
        }
        (winnerMessage as HTMLElement).textContent = `${winnerCar?.name} win ${winnerCar?.time} sec`;
        winnerMessage?.classList.add('score-disable');

        (element.nextElementSibling as HTMLButtonElement).disabled = false;
        element.nextElementSibling?.classList.add('active-button');

        break;

      case element.classList.contains('reset'):
        arrCars = (await CarServices.getCars(numberPage))?.item;
        const promisesStop = arrCars?.map(async elem => {
          const currentCarStop = document.getElementById(`car-${elem.id}`);
          currentCarStop?.classList.remove('in-transit');
          const { velocity: velocityCarStop, distance: distanceCarStop } = (await EngineServices.stopEngineCar(elem.id))
            .data;
          const animationTimeRaceStop = distanceCarStop / velocityCarStop;
          animation(currentCarStop, distanceCarStop, animationTimeRaceStop);
        });
        await Promise.all(promisesStop as Promise<void>[]);
        disableAllControlButton(element);
        element.classList.remove('active-button');
        (element as HTMLButtonElement).disabled = true;
        (element.previousElementSibling as HTMLButtonElement).disabled = false;
        element.previousElementSibling?.classList.add('active-button');
        winnerMessage?.classList.remove('score-disable');
        (winnerMessage as HTMLElement).textContent = '';
        break;

      default:
        break;
    }
  });
}
