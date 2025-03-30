import type { AxiosResponse } from 'axios';
import type { IWinnerCar, IWinnersCars } from '../types/types';
import Api from './api';

class WinnersServices {
  public static readonly getSort = (sort: string, order: string): string => {
    if (sort && order) {
      return `&_sort=${sort}&_order=${order}`;
    }
    return '';
  };

  public static readonly getWinners = async (
    page = 1,
    limit = 10,
    sort = 'id',
    order = 'ASC'
  ): Promise<IWinnersCars> => {
    const response = await Api.winnersApi.get(`?_page=${page}&_limit=${limit}_sort=${this.getSort(sort, order)}`);
    return { item: response.data, count: response.headers['x-total-count'] };
  };

  public static readonly getWinner = async (id: number): Promise<AxiosResponse<IWinnerCar>> =>
    Api.winnersApi.get<IWinnerCar>(`/${id}`);

  public static readonly createWinner = async (
    id: number,
    wins: number,
    time: number
  ): Promise<AxiosResponse<IWinnerCar>> => Api.winnersApi.post<IWinnerCar>('', { id, wins, time });

  public static readonly updateWinner = async (
    id: number,
    wins: number,
    time: number
  ): Promise<AxiosResponse<IWinnerCar>> => Api.winnersApi.put<IWinnerCar>(`/${id}`, { wins, time });

  public static readonly deleteWinnerCar = async (id: number): Promise<AxiosResponse> =>
    Api.winnersApi.delete(`/${id}`);
}
export default WinnersServices;
