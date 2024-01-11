import { ColorFilter } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Color } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colorFilterPairs = new Map<ColorFilter, ColorFilter>([
  ['increment-alphabet', 'decrement-alphabet'],
  ['increment-number', 'decrement-number'],
]);

export function isColorFilterHasPairs(filter: ColorFilter) {
  let isHasPairs = false;

  for (const [key, value] of colorFilterPairs.entries()) {
    if (key === filter) {
      isHasPairs = true;
    }

    if (value === filter) {
      isHasPairs = true;
    }
  }

  return isHasPairs;
}

export function getColorFilterOpponent(filter: ColorFilter) {
  for (const [key, value] of colorFilterPairs.entries()) {
    if (key === filter) {
      return value;
    }

    if (value === filter) {
      return key;
    }
  }
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
    filteredColors = [
      ...filteredColors.sort((a, b) => alphabetComparison(a, b)),
    ];
  } else if (colorFilters.has('decrement-alphabet')) {
    filteredColors = [
      ...filteredColors.sort((a, b) => alphabetComparison(a, b) * -1),
    ];
  }

  if (colorFilters.has('increment-number')) {
    filteredColors = [
      ...filteredColors.sort((a, b) => numericComparison(a, b)),
    ];
  } else if (colorFilters.has('decrement-number')) {
    filteredColors = [
      ...filteredColors.sort((a, b) => numericComparison(a, b) * -1),
    ];
  }

  return filteredColors;
}
