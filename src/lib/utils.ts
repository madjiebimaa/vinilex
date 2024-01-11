import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Color, ColorFilter, RGB } from './types';

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

export function hexCodeToRGB(hexCode: string) {
  const formattedHexCode = hexCode.replace('#', '');
  const baseNumber = 16;

  const r = parseInt(formattedHexCode.slice(0, 2), baseNumber);
  const g = parseInt(formattedHexCode.slice(2, 4), baseNumber);
  const b = parseInt(formattedHexCode.slice(4, 6), baseNumber);

  return { r, g, b };
}

export function distance(rgb: RGB, comparedRgb: RGB) {
  return Math.sqrt(
    Math.pow(rgb.r - comparedRgb.r, 2) -
      Math.pow(rgb.g - comparedRgb.g, 2) -
      Math.pow(rgb.b - comparedRgb.b, 2)
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
      distance: distance(
        hexCodeToRGB(color.hexCode),
        hexCodeToRGB(comparedColor.hexCode)
      ),
    }))
    .sort((colorA, colorB) => colorA.distance - colorB.distance)
    .slice(0, n);
}
