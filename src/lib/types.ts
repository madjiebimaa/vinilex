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

export type MatrixItem = {
  matrix: number[][];
  rowStartIndex: number;
  columnStartIndex: number;
  size: number;
};

export type Matrix = number[][];

export type GridItem = {
  gridRowStart: number;
  gridRowEnd: number;
  gridColumnStart: number;
  gridColumnEnd: number;
};

export type Grid = GridItem[];

export type Bubble = {
  distance: number;
  id: string;
  name: string;
  code: string;
  hexCode: string;
  item: GridItem;
};

export type Bubbles = Bubble[];

export interface Image extends File {
  id: string;
  preview: string | ArrayBuffer | null;
  dominantColorHexCode: string | null;
}
