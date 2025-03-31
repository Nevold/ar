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
  return new Array(count).fill({}).map(() => ({ name: getRandomName(), color: getRandomColor() }));
}

export async function animation(
  currentCar: HTMLElement | null,
  _: number,
  animationTime: number,
  carId = -1
): Promise<boolean | undefined> {
  let start: null | number = null;
  const DRAG_COEFFICIENT = 250;
  let successAnimationCarId: number;
  let windowSize = window.innerWidth;
  window.addEventListener('resize', () => {
    windowSize = window.innerWidth;
    return windowSize;
  });
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passedPath = Math.round((time * (windowSize - DRAG_COEFFICIENT)) / animationTime);
    if (currentCar) currentCar.style.transform = `translateX(${Math.min(passedPath, windowSize - DRAG_COEFFICIENT)}px)`;
    if (passedPath < windowSize - DRAG_COEFFICIENT && currentCar?.classList.contains('in-transit')) {
      successAnimationCarId = window.requestAnimationFrame(step);
    }
  }
  successAnimationCarId = window.requestAnimationFrame(step);

  if (carId !== -1) {
    const successAnimationCar = (await EngineServices.isSuccessDriveCar(carId)).success;
    if (!successAnimationCar) {
      window.cancelAnimationFrame(successAnimationCarId);
    }
    return successAnimationCar;
  }
  return undefined;
}

export function disableAllControlButton(element: HTMLElement) {
  const controlButtonsList = document.getElementsByClassName('control-button') as HTMLCollectionOf<HTMLDivElement>;
  const generateBtn = document.getElementById('generate') as HTMLButtonElement;
  const updateBtn = document.getElementById('update-submit') as HTMLButtonElement;
  const createBtn = document.getElementById('create-submit') as HTMLButtonElement;
  const nextBtn = document.getElementById('next') as HTMLButtonElement;
  const prevBtn = document.getElementById('prev') as HTMLButtonElement;
  if (element.classList.contains('race')) {
    generateBtn.disabled = true;
    updateBtn.disabled = true;
    createBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    generateBtn.classList.add('button-disabled');
    updateBtn.classList.add('button-disabled');
    createBtn.classList.add('button-disabled');
    prevBtn.classList.add('button-disabled');
    nextBtn.classList.add('button-disabled');
  }
  if (element.classList.contains('reset')) {
    generateBtn.disabled = false;
    updateBtn.disabled = false;
    createBtn.disabled = false;
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    generateBtn.classList.remove('button-disabled');
    updateBtn.classList.remove('button-disabled');
    createBtn.classList.remove('button-disabled');
    prevBtn.classList.remove('button-disabled');
    nextBtn.classList.remove('button-disabled');
  }

  [...controlButtonsList].forEach(elem => {
    const btnElements = [...elem.children] as Array<HTMLButtonElement>;
    btnElements.pop();
    btnElements.forEach(btn => {
      if (element.classList.contains('race')) {
        btn.disabled = true;
        btn.classList.add('button-disabled');
      } else {
        btn.disabled = false;
        btn.classList.remove('button-disabled');
      }
    });
  });
  const startIconList = document.getElementsByClassName('start-icon') as HTMLCollectionOf<HTMLButtonElement>;
  [...startIconList].forEach(btn => {
    if (element.classList.contains('race')) {
      btn.disabled = true;
      btn.classList.remove('active-icon');
    } else {
      btn.disabled = false;
      btn.classList.add('active-icon');
    }
  });
}

export function disabledRaceButton(element: HTMLElement) {
  const raceBtn = document.getElementById('race') as HTMLButtonElement;
  const stopCarBtnList = document.getElementsByClassName('stop-icon') as HTMLCollectionOf<HTMLButtonElement>;
  const classList = element.classList;
  const qtMoveCars = [...stopCarBtnList].filter(elem => elem.classList.contains('active-icon')).length;
  if (classList.contains('start-icon')) {
    raceBtn?.classList.remove('active-button');
    raceBtn.disabled = true;
  }
  if (classList.contains('stop-icon') && qtMoveCars === 0) {
    raceBtn?.classList.add('active-button');
    raceBtn.disabled = false;
  }
  if (
    classList.contains('remove-car') ||
    classList.contains('create-submit') ||
    classList.contains('update-flag') ||
    classList.contains('generate') ||
    classList.contains('prev-btn') ||
    classList.contains('next-btn')
  ) {
    raceBtn?.classList.add('active-button');
    raceBtn.disabled = false;
  }
}
