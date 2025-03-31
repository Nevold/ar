import EngineServices from '../api-services/engine-services';
import { Constants } from './constants';

const modelCars = ['Toyota', 'Mercedes', 'BMW', 'Honda', 'Volkswagen', 'Ford', 'Hyundai', 'Audi', 'Porsche', 'Nissan'];
const modelNames = ['rav4', 's600', '3', 'accord', 'golf', 'mondeo', 'i30', 'q5', 'cayenne'];

function getRandomName(): string {
  const modelCar = modelCars[Math.floor(Math.random() * modelCars.length)];
  const modelName = modelNames[Math.floor(Math.random() * modelNames.length)];
  return `${modelCar} ${modelName}`;
}

function getRandomColor(): string {
  let hash = '#';
  for (let index = 0; index < Constants.COLOR_LIMIT; index += 1) {
    hash += Constants.SIMBOL[Math.floor(Math.random() * Constants.SIMBOL.length)];
  }
  return hash;
}

export function generateCars(count = Constants.CAR_LIMIT): {
  name: string;
  color: string;
}[] {
  return Array.from({ length: count })
    .fill({})
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));
}

export async function animation(
  currentCar: HTMLElement | null,
  _: number,
  animationTime: number,
  carId = -1
): Promise<boolean | undefined> {
  let start: null | number;
  const DRAG_COEFFICIENT = 250;
  let successAnimationCarId: number;
  let windowSize = window.innerWidth;
  window.addEventListener('resize', () => {
    windowSize = window.innerWidth;
    return windowSize;
  });
  function step(timestamp: number): void {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passedPath = Math.round((time * (windowSize - DRAG_COEFFICIENT)) / animationTime);
    if (currentCar) currentCar.style.transform = `translateX(${Math.min(passedPath, windowSize - DRAG_COEFFICIENT)}px)`;
    if (passedPath < windowSize - DRAG_COEFFICIENT && currentCar?.classList.contains('in-transit')) {
      successAnimationCarId = globalThis.requestAnimationFrame(step);
    }
  }
  successAnimationCarId = globalThis.requestAnimationFrame(step);

  if (carId !== -1) {
    const driveResult = await EngineServices.isSuccessDriveCar(carId);
    const successAnimationCar = driveResult.success;
    if (!successAnimationCar) {
      globalThis.cancelAnimationFrame(successAnimationCarId);
    }
    return successAnimationCar;
  }
  return undefined;
}

export function disableAllControlButton(element: HTMLElement): void {
  const controlButtonsList = document.getElementsByClassName('control-button') as HTMLCollectionOf<HTMLDivElement>;
  const generateButton = document.getElementById('generate') as HTMLButtonElement;
  const updateButton = document.getElementById('update-submit') as HTMLButtonElement;
  const createButton = document.getElementById('create-submit') as HTMLButtonElement;
  const nextButton = document.getElementById('next') as HTMLButtonElement;
  const previousButton = document.getElementById('prev') as HTMLButtonElement;
  if (element.classList.contains('race')) {
    generateButton.disabled = true;
    updateButton.disabled = true;
    createButton.disabled = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
    generateButton.classList.add('button-disabled');
    updateButton.classList.add('button-disabled');
    createButton.classList.add('button-disabled');
    previousButton.classList.add('button-disabled');
    nextButton.classList.add('button-disabled');
  }
  if (element.classList.contains('reset')) {
    generateButton.disabled = false;
    updateButton.disabled = false;
    createButton.disabled = false;
    previousButton.disabled = false;
    nextButton.disabled = false;
    generateButton.classList.remove('button-disabled');
    updateButton.classList.remove('button-disabled');
    createButton.classList.remove('button-disabled');
    previousButton.classList.remove('button-disabled');
    nextButton.classList.remove('button-disabled');
  }

  [...controlButtonsList].forEach(element_ => {
    const buttonElements = [...element_.children] as Array<HTMLButtonElement>;
    buttonElements.pop();
    buttonElements.forEach(button => {
      if (element.classList.contains('race')) {
        button.disabled = true;
        button.classList.add('button-disabled');
      } else {
        button.disabled = false;
        button.classList.remove('button-disabled');
      }
    });
  });
  const startIconList = document.getElementsByClassName('start-icon') as HTMLCollectionOf<HTMLButtonElement>;
  [...startIconList].forEach(button => {
    if (element.classList.contains('race')) {
      button.disabled = true;
      button.classList.remove('active-icon');
    } else {
      button.disabled = false;
      button.classList.add('active-icon');
    }
  });
}

export function disabledRaceButton(element: HTMLElement): void {
  const raceButton = document.getElementById('race') as HTMLButtonElement;
  const stopCarButtonList = document.getElementsByClassName('stop-icon') as HTMLCollectionOf<HTMLButtonElement>;
  const { classList } = element;
  const qtMoveCars = [...stopCarButtonList].filter(element_ => element_.classList.contains('active-icon')).length;
  if (classList.contains('start-icon')) {
    raceButton?.classList.remove('active-button');
    raceButton.disabled = true;
  }
  if (classList.contains('stop-icon') && qtMoveCars === 0) {
    raceButton?.classList.add('active-button');
    raceButton.disabled = false;
  }
  if (
    classList.contains('remove-car') ||
    classList.contains('create-submit') ||
    classList.contains('update-flag') ||
    classList.contains('generate') ||
    classList.contains('prev-btn') ||
    classList.contains('next-btn')
  ) {
    raceButton?.classList.add('active-button');
    raceButton.disabled = false;
  }
}
