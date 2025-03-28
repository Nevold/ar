import type { AxiosResponse, AxiosError } from 'axios';
import type { IEngineCar } from '../types/types';
import Api from './api';
import { isAxiosErrorCustom } from '../shared/utils';

class EngineServices {
  public static readonly startEngineCar = async (id: number): Promise<AxiosResponse<IEngineCar>> =>
    Api.engineApi.patch(`?id=${id}&status=started`);

  public static readonly stopEngineCar = async (id: number): Promise<AxiosResponse<IEngineCar>> =>
    Api.engineApi.patch(`?id=${id}&status=stopped`);

  public static readonly isSuccessDriveCar = async (id: number): Promise<{ success: boolean }> => {
    try {
      const response = await Api.engineApi.patch<{ success: boolean }>(`?id=${id}&status=drive`);
      if (
        response &&
        typeof response === 'object' &&
        'data' in response &&
        typeof response.data === 'object' &&
        response.data !== null &&
        'success' in response.data &&
        typeof response.data.success === 'boolean'
      ) {
        const resp = response.data;
        return resp;
      }
      return { success: false };
    } catch (error) {
      if (
        (isAxiosErrorCustom(error) && error.response?.status === 404) ||
        (isAxiosErrorCustom(error) && error.response?.status === 429)
      ) {
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
