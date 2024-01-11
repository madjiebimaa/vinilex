export type Color = {
  id: string;
  name: string;
  code: string;
  hexCode: string;
};

export type ColorFilter =
  | 'favorite'
  | 'increment-alphabet'
  | 'decrement-alphabet'
  | 'increment-number'
  | 'decrement-number';

export type RGB = {
  r: number;
  g: number;
  b: number;
};
