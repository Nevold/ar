import { ICar, ICars } from '../types/types';
import { AxiosResponse } from 'axios';
import Api from './api';
class CarServices {
  static readonly getCar = async (id: number): Promise<AxiosResponse<ICar>> => {
    return Api.garageApi.get<ICar>(`/${id}`);
  };
  static readonly getCars = async (page: number, limit = 7): Promise<ICars | undefined> => {
    try {
      const response = await Api.garageApi.get<ICar[]>(`?_page=${page}&_limit=${limit}`);
      return { item: response.data, count: response.headers['x-total-count'] };
    } catch (error) {
      console.log('Error:', error);
    }
  };
  static readonly createCar = async (name: string, color: string): Promise<AxiosResponse<ICar>> => {
    return Api.garageApi.post<ICar>('', { name, color });
  };

  static readonly deleteCar = async (id: number): Promise<AxiosResponse> => {
    return Api.garageApi.delete(`/${id}`);
  };

  static readonly updateCar = async (id: number, name: string, color: string): Promise<AxiosResponse<ICar>> => {
    return Api.garageApi.put<ICar>(`/${id}`, { name, color });
  };
}

export default CarServices;
