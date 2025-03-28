import type { AxiosResponse, AxiosError } from 'axios';
import type { IEngineCar } from '../types/types';
import Api from './api';

class EngineServices {
  public static readonly startEngineCar = async (id: number): Promise<AxiosResponse<IEngineCar>> =>
    Api.engineApi.patch(`?id=${id}&status=started`);

  public static readonly stopEngineCar = async (id: number): Promise<AxiosResponse<IEngineCar>> =>
    Api.engineApi.patch(`?id=${id}&status=stopped`);

  public static readonly isSuccessDriveCar = async (id: number): Promise<{ success: boolean }> => {
    try {
      const responce = await Api.engineApi.patch(`?id=${id}&status=drive`);
      return responce.data;
    } catch (error) {
      if ((error as AxiosError).response?.status === 404 || (error as AxiosError).response?.status === 429) {
        console.log(
          '%c STOP repeating this operation again and again as a mad man:) It is not a bug!',
          'background: grey;color:#e9ed09;font-weight:bold'
        );
      } else {
        console.log(
          `%c Description: ${(error as AxiosError).response?.data}`,
          'background: grey;color:#e9ed09;font-weight:bold'
        );
      }
      return { success: false };
    }
  };
}
export default EngineServices;
