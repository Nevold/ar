import { animationCar } from '../controllers/animation-car';
import { setFlippedGarage } from '../controllers/flipped-garage';
import { setFlippedWinners } from '../controllers/flipped-winners';
import { changeCar } from '../controllers/change-car';
import { routing } from '../controllers/routing';
import { sortWinners } from '../controllers/sort-winners';
import { generateCars } from '../shared/utils';
import { render } from '../view/main-page/render';
import { updateGaragePage } from '../view/update-garage/update-garage';
import { updateWinnerPage } from '../view/winners-pages/update-winners';

class App {
  public static readonly start = async (): Promise<void> => {
    render();
    await updateGaragePage();
    await updateWinnerPage();
    changeCar();
    sortWinners();
    routing();
    setFlippedGarage();
    setFlippedWinners();
    generateCars();
    animationCar();
  };
}
export default App;
