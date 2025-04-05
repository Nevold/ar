import type { ICar, ISuccessRaceCars } from '../types/types';
import { animation, disableAllControlButton, disabledRaceButton } from '../shared/utils';
import WinnersServices from '../api-services/winners-services';
import { Constants } from '../shared/constants';
import CarServices from '../api-services/car-services';
import EngineServices from '../api-services/engine-services';

export function animationCar(): void {
  let id: number;
  let currentCar: HTMLElement | null;
  let arrayCars: ICar[] | undefined;
  let numberPage: number;
  const winnerMessage = document.querySelector('.winner-message');

  document.body.addEventListener('click', async event => {
    const page: HTMLElement | null = document.querySelector('.number-page');
    if (page && page.textContent) {
      numberPage = Number(page.textContent.split('Page# ').pop());
    }

    if (event.target instanceof HTMLElement) {
      const element = event.target;

      switch (true) {
        case element.classList.contains('start-icon'): {
          id = Number(element.id.split('start-car-').pop());
          currentCar = document.getElementById(`car-${id}`);
          currentCar?.classList.add('in-transit');
          const startButton = currentCar?.previousElementSibling?.previousElementSibling?.firstElementChild;

          if (startButton && startButton instanceof HTMLButtonElement) {
            startButton.disabled = true;
            const startEngineCarResult = await EngineServices.startEngineCar(id);
            const { velocity: velocityStart, distance: distanceStart } = startEngineCarResult.data;
            const animationTimeStart = distanceStart / velocityStart;
            await animation(currentCar, distanceStart, animationTimeStart, id);
            startButton.classList.remove('active-icon');

            if (startButton.nextElementSibling instanceof HTMLButtonElement) {
              startButton.nextElementSibling.classList.add('active-icon');
              startButton.nextElementSibling.disabled = false;
            }
          }

          disabledRaceButton(element);
          break;
        }

        case element.classList.contains('stop-icon'): {
          id = Number(element.id.split('stop-car-').pop());
          currentCar = document.getElementById(`car-${id}`);
          currentCar?.classList.remove('in-transit');
          const stopButton = currentCar?.previousElementSibling?.previousElementSibling?.lastElementChild;

          if (stopButton && stopButton instanceof HTMLButtonElement) {
            stopButton.disabled = true;
            const stopEngineCarResult = await EngineServices.stopEngineCar(id);
            const { velocity: velocityStop, distance: distanceStop } = stopEngineCarResult.data;
            const animationTimeStop = distanceStop / velocityStop;
            await animation(currentCar, distanceStop, animationTimeStop);
            stopButton.classList.remove('active-icon');
          }

          if (stopButton && stopButton.previousElementSibling instanceof HTMLButtonElement) {
            stopButton.previousElementSibling.classList.add('active-icon');
            stopButton.previousElementSibling.disabled = false;
          }

          disabledRaceButton(element);
          break;
        }

        case element.classList.contains('race'): {
          disableAllControlButton(element);
          const carsArrayResult = await CarServices.getCars(numberPage);
          arrayCars = carsArrayResult?.item;
          const promisesStart = arrayCars?.map(async element_ => {
            const currentCarStart = document.getElementById(`car-${element_.id}`);
            currentCarStart?.classList.add('in-transit');
            const startEngineCarResult = await EngineServices.startEngineCar(element_.id);
            const { velocity: velocityCarStart, distance: distanceCarStart } = startEngineCarResult.data;
            const animationTimeRaceStart = distanceCarStart / velocityCarStart;

            const isSuccess = await animation(currentCarStart, distanceCarStart, animationTimeRaceStart, element_.id);

            return { ...element_, time: Number((animationTimeRaceStart / 1000).toFixed(2)), success: !!isSuccess };
          });

          if (element instanceof HTMLButtonElement) {
            element.disabled = true;
          }

          element.classList.remove('active-button');

          const currentRaceCars = promisesStart ? await Promise.all(promisesStart) : [];
          const currentRaceCarsTemporary = [...currentRaceCars];
          const currentRaceCarsSort = currentRaceCarsTemporary.sort((a: ISuccessRaceCars, b: ISuccessRaceCars) =>
            a.time > b.time ? 1 : -1
          );

          const returnFirstFastCar = async (): Promise<ISuccessRaceCars | undefined> => {
            const fastestDriveCar = currentRaceCarsSort.shift();
            const isSuccess = fastestDriveCar?.success;
            if (isSuccess || currentRaceCarsSort.length === 0) {
              return fastestDriveCar;
            }
            return returnFirstFastCar();
          };

          try {
            const winnerCar = await returnFirstFastCar();

            if (winnerCar !== undefined) {
              const winnersArrayResult = await WinnersServices.getWinners();
              const WinnerExsist = winnersArrayResult.item.filter(element_ => element_.id === winnerCar.id);

              if (WinnerExsist.length === 0) {
                await WinnersServices.createWinner(winnerCar.id, Constants.ONE_WIN, winnerCar.time);
              } else {
                const winnerResult = await WinnersServices.getWinner(winnerCar.id);
                const increaseWin = winnerResult.data.wins + Constants.ONE_WIN;
                await (WinnerExsist[Constants.FIRST_ELEM_ARRAY].time > winnerCar.time
                  ? WinnersServices.updateWinner(winnerCar.id, increaseWin, winnerCar.time)
                  : WinnersServices.updateWinner(
                      winnerCar.id,
                      increaseWin,
                      WinnerExsist[Constants.FIRST_ELEM_ARRAY].time
                    ));
              }
            }
            if (winnerMessage) {
              winnerMessage.textContent = `${winnerCar?.name} win ${winnerCar?.time} sec`;
              winnerMessage.classList.add('score-disable');
            }
          } catch (error) {
            console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
          }

          if (element.nextElementSibling instanceof HTMLButtonElement) {
            element.nextElementSibling.disabled = false;
            element.nextElementSibling?.classList.add('active-button');
          }

          break;
        }

        case element.classList.contains('reset'): {
          try {
            const carArrayResult = await CarServices.getCars(numberPage);
            arrayCars = carArrayResult?.item;
            const promisesStop = arrayCars?.map(async element_ => {
              const currentCarStop = document.getElementById(`car-${element_.id}`);
              currentCarStop?.classList.remove('in-transit');

              const stopEngineCarResult = await EngineServices.stopEngineCar(element_.id);
              const { velocity: velocityCarStop, distance: distanceCarStop } = stopEngineCarResult.data;
              const animationTimeRaceStop = distanceCarStop / velocityCarStop;
              await animation(currentCarStop, distanceCarStop, animationTimeRaceStop);
            });

            if (promisesStop) {
              await Promise.all(promisesStop);
            }
          } catch (error) {
            console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
          }

          disableAllControlButton(element);
          element.classList.remove('active-button');

          if (
            element instanceof HTMLButtonElement &&
            element.previousElementSibling instanceof HTMLButtonElement &&
            winnerMessage
          ) {
            element.disabled = true;
            element.previousElementSibling.disabled = false;
            element.previousElementSibling?.classList.add('active-button');
            winnerMessage?.classList.remove('score-disable');
            winnerMessage.textContent = '';
          }
          break;
        }

        default: {
          break;
        }
      }
    }
  });
}
