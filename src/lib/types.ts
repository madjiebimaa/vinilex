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

export type XYZ = {
  x: number;
  y: number;
  z: number;
};

export type TextHexCode = '#000' | '#FFF';
