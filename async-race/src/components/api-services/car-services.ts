import type { AxiosResponse } from 'axios';

import type { ICar, ICars } from '../types/types';

import Api from './api';

class CarServices {
  public static readonly getCar = async (id: number): Promise<AxiosResponse<ICar>> => Api.garageApi.get<ICar>(`/${id}`);

  public static readonly getCars = async (page: number, limit = 7): Promise<ICars | undefined> => {
    try {
      const response = await Api.garageApi.get<ICar[]>(`?_page=${page}&_limit=${limit}`);
      return { item: response.data, count: response.headers['x-total-count'] };
    } catch (error) {
      console.log('Error:', error);
      return undefined;
    }
  };

  public static readonly createCar = async (name: string, color: string): Promise<AxiosResponse<ICar>> =>
    Api.garageApi.post<ICar>('', { name, color });

  public static readonly deleteCar = async (id: number): Promise<AxiosResponse> => Api.garageApi.delete(`/${id}`);

  public static readonly updateCar = async (id: number, name: string, color: string): Promise<AxiosResponse<ICar>> =>
    Api.garageApi.put<ICar>(`/${id}`, { name, color });
}

export default CarServices;
