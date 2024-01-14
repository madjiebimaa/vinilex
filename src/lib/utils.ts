import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  Color,
  ColorFilter,
  Grid,
  GridItem,
  RGB,
  TextHexCode,
  XYZ,
} from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colorSorts: Exclude<ColorFilter, 'favorite'>[] = [
  'increment-alphabet',
  'decrement-alphabet',
  'increment-number',
  'decrement-number',
];

export function isColorSort(colorFilter: ColorFilter) {
  return colorFilter !== 'favorite';
}

export function getColorSortOpponents(colorFilter: ColorFilter) {
  return colorSorts.filter(
    (colorSortFilter) => colorSortFilter !== colorFilter
  );
}

export function applyColorFilter(
  filteredColors: Color[],
  colorFilters: Set<ColorFilter>,
  favoriteColors: Color['id'][]
) {
  if (colorFilters.has('favorite')) {
    filteredColors = filteredColors.filter((color) =>
      favoriteColors.includes(color.id)
    );
  }

  return filteredColors;
}

function alphabetComparison(a: Color, b: Color) {
  return a.name.localeCompare(b.name, 'en', {
    ignorePunctuation: true,
  });
}

function numericComparison(a: Color, b: Color) {
  return a.code.localeCompare(b.code, undefined, {
    numeric: true,
  });
}

export function applyColorSort(
  filteredColors: Color[],
  colorFilters: Set<ColorFilter>
) {
  if (colorFilters.has('increment-alphabet')) {
    return [...filteredColors.sort((a, b) => alphabetComparison(a, b))];
  }

  if (colorFilters.has('decrement-alphabet')) {
    return [...filteredColors.sort((a, b) => alphabetComparison(a, b) * -1)];
  }

  if (colorFilters.has('increment-number')) {
    return [...filteredColors.sort((a, b) => numericComparison(a, b))];
  }

  if (colorFilters.has('decrement-number')) {
    return [...filteredColors.sort((a, b) => numericComparison(a, b) * -1)];
  }

  return filteredColors;
}

function hexCodeToRGB(hexCode: string) {
  const formattedHexCode = hexCode.replace('#', '');
  const baseNumber = 16;

  const r = parseInt(formattedHexCode.slice(0, 2), baseNumber);
  const g = parseInt(formattedHexCode.slice(2, 4), baseNumber);
  const b = parseInt(formattedHexCode.slice(4, 6), baseNumber);

  return { r, g, b };
}

function normalizeRGB({ r, g, b }: RGB) {
  return { nr: r / 255, ng: g / 255, nb: b / 255 };
}

function RGBToXYZ(rgb: RGB) {
  const { nr, ng, nb } = normalizeRGB(rgb);

  const x = 0.4124564 * nr + 0.3575761 * ng + 0.1804375 * nb;
  const y = 0.2126729 * nr + 0.7151522 * ng + 0.072175 * nb;
  const z = 0.0193339 * nr + 0.119192 * ng + 0.9503041 * nb;

  return { x, y, z };
}

function normalizeXYZ({ x, y, z }: XYZ) {
  return { nx: x / 0.9642, ny: y / 1.0, nz: z / 0.8249 };
}

function XYZValueToLabColorSpace(normalizeValue: number) {
  return normalizeValue > 0.008856
    ? Math.pow(normalizeValue, 1 / 3)
    : (903.3 * normalizeValue + 16) / 116;
}

function XYZToLab(xyz: XYZ) {
  const { nx, ny, nz } = normalizeXYZ(xyz);

  const fx = XYZValueToLabColorSpace(nx);
  const fy = XYZValueToLabColorSpace(ny);
  const fz = XYZValueToLabColorSpace(nz);

  const L = Math.max(0, 116 * fy - 16);
  const a = (fx - fy) * 500;
  const b = (fy - fz) * 200;

  return { L, a, b };
}

function RGBToLab(rgb: RGB) {
  const xyz = RGBToXYZ(rgb);
  return XYZToLab(xyz);
}

function colorDistance(rgb: RGB, comparedRgb: RGB) {
  const { L, a, b } = RGBToLab(rgb);
  const { L: comparedL, a: comparedA, b: comparedB } = RGBToLab(comparedRgb);

  return Math.sqrt(
    Math.pow(L - comparedL, 2) +
      Math.pow(a - comparedA, 2) +
      Math.pow(b - comparedB, 2)
  );
}

export function getTopNClosestColors(
  color: Color,
  comparedColors: Color[],
  n: number = 5
) {
  return comparedColors
    .filter((comparedColor) => comparedColor.id !== color.id)
    .map((comparedColor) => ({
      ...comparedColor,
      distance: colorDistance(
        hexCodeToRGB(color.hexCode),
        hexCodeToRGB(comparedColor.hexCode)
      ),
    }))
    .sort((colorA, colorB) => colorA.distance - colorB.distance)
    .slice(0, n);
}

export function toGrayScale({ r, g, b }: RGB) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getOppositeContrast(hexCode: string): TextHexCode {
  return toGrayScale(hexCodeToRGB(hexCode)) > 128 ? '#000' : '#FFF';
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function between(num: number, min: number, max: number) {
  return num >= min && num <= max;
}

function generateGridItem(gridSize: number, itemSize: number): GridItem {
  const gridLines = gridSize + 1;
  const lineStart = 1;
  const lineEnd = Math.floor(gridLines / 2);

  const gridRowStart = getRandomInt(lineStart, lineEnd);
  const gridRowEnd = gridRowStart + itemSize;

  const gridColumnStart = getRandomInt(lineStart, lineEnd);
  const gridColumnEnd = gridColumnStart + itemSize;

  return { gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd };
}

function isGridItem(obj: unknown): obj is GridItem {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'gridRowStart' in obj &&
    'gridRowEnd' in obj &&
    'gridColumnStart' in obj &&
    'gridColumnEnd' in obj
  );
}

function isGridItemOverlap(gridItems: GridItem[], item: GridItem) {
  return Boolean(
    gridItems.find(
      (gridItem) =>
        between(
          item.gridRowStart,
          gridItem.gridRowStart,
          gridItem.gridRowEnd
        ) ||
        between(
          item.gridColumnEnd,
          gridItem.gridColumnStart,
          gridItem.gridColumnEnd
        ) ||
        between(
          item.gridColumnStart,
          gridItem.gridColumnStart,
          gridItem.gridColumnEnd
        ) ||
        between(
          item.gridColumnEnd,
          gridItem.gridColumnStart,
          gridItem.gridColumnEnd
        )
    )
  );
}

export function generateGrid(size: number, numberOfItems: number) {
  const grid: Grid = { size, items: [] };

  for (let index = 0; index < numberOfItems; index++) {
    let item: GridItem | null = null;
    while (!isGridItem(item)) {
      const gridLines = grid.size + 1;

      const itemSize = Math.floor(gridLines / 2) - index - 1;
      const candidateItem = generateGridItem(grid.size, itemSize);
      if (!isGridItemOverlap(grid.items, candidateItem)) {
        item = candidateItem;
      }
    }

    grid.items.push(item);
  }

  return grid;
}
