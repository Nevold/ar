import { IWinnerCar, IWinnersCars } from '../types/types';
import { AxiosResponse } from 'axios';
import Api from './api';

class WinnersServices {
  static readonly getSort = (sort: string, order: string): string => {
    if (sort && order) {
      return `&_sort=${sort}&_order=${order}`;
    }
    return '';
  };
  static readonly getWinners = async (page = 1, limit = 10, sort = 'id', order = 'ASC'): Promise<IWinnersCars> => {
    const response = await Api.winnersApi.get(`?_page=${page}&_limit=${limit}_sort=${this.getSort(sort, order)}`);
    return { item: response.data, count: response.headers['x-total-count'] };
  };
  static readonly getWinner = async (id: number): Promise<AxiosResponse<IWinnerCar>> => {
    return Api.winnersApi.get<IWinnerCar>(`/${id}`);
  };
  static readonly createWinner = async (id: number, wins: number, time: number): Promise<AxiosResponse<IWinnerCar>> => {
    return Api.winnersApi.post<IWinnerCar>('', { id, wins, time });
  };
  static readonly updateWinner = async (id: number, wins: number, time: number): Promise<AxiosResponse<IWinnerCar>> => {
    return Api.winnersApi.put<IWinnerCar>(`/${id}`, { wins, time });
  };
  static readonly deleteWinnerCar = async (id: number): Promise<AxiosResponse> => {
    return Api.winnersApi.delete(`/${id}`);
  };
}
export default WinnersServices;
