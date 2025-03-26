import axios from 'axios';
import Constants from '../shared/constants';
class Api {
  static readonly garageApi = axios.create({
    baseURL: Constants.GARAGE_URL
  });

  static readonly engineApi = axios.create({
    baseURL: Constants.ENGINE_URL
  });

  static readonly winnersApi = axios.create({
    baseURL: Constants.WINNERS_URL
  });
}

export default Api;
