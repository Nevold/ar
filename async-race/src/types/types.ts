export type NodeType =
  | HTMLElement
  | HTMLLabelElement
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLDialogElement
  | HTMLTextAreaElement;

export interface Options {
  [key: string]: string;
}

export interface Database {
  list: {
    id: string;
    title: string;
    weight: string;
  }[];
  lastId: number;
}

export type RouteHandler = () => void;
