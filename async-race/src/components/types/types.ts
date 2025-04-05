export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICars {
  item: ICar[];
  count: string | null;
}

export interface IEngineCar {
  velocity: number;
  distance: number;
}

export interface IWinnerCar {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnersCars {
  item: IWinnerCar[];
  count: string | null;
}

export interface ISort {
  success: boolean | undefined;
  time: number;
  name: string;
  color: string;
  id: number;
}

export interface ISuccessRaceCars {
  success: boolean;
  time: number;
  name: string;
  color: string;
  id: number;
}

export interface IOptions {
  success: boolean | undefined;
  time: number;
  name: string;
  color: string;
  id: number;
}

export interface CustomAxiosError<T = unknown> extends Error {
  response?: {
    data: T;
    status: number;
  };
}

export type NodeType = HTMLElement | HTMLLabelElement | HTMLButtonElement | HTMLInputElement;

export interface Options {
  [key: string]: string;
}
