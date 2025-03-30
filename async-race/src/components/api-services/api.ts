import axios from 'axios';
import { Constants } from '../shared/constants';

class Api {
  public static readonly garageApi = axios.create({
    baseURL: Constants.GARAGE_URL
  });

  public static readonly engineApi = axios.create({
    baseURL: Constants.ENGINE_URL
  });

  public static readonly winnersApi = axios.create({
    baseURL: Constants.WINNERS_URL
  });
}

export default Api;
