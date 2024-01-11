import {
  applyColorFilter,
  applyColorSort,
  getColorSortOpponents,
  isColorSort,
} from '@/lib/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import colors from '../data/colors.json';
import { Color, ColorFilter } from './../lib/types';

type ColorState = {
  selectedColor: Color | null;
  favoriteColors: Color['id'][];
  colorFilters: Set<ColorFilter>;
  filteredColors: Color[];
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
    toggleColorToFavorite: (id: Color['id']) => void;
    setColorFilters: (filter: ColorFilter) => void;
    filterColors: () => void;
    searchColors: (name: Color['name']) => void;
  };
};

const initialState: ColorState = {
  selectedColor: null,
  favoriteColors: [],
  colorFilters: new Set<ColorFilter>(),
  filteredColors: colors,
};

const colorStore = create<ColorState & ColorActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        selectColor: (color) =>
          set((state) => {
            if (state.selectedColor && state.selectedColor.id === color.id) {
              return {
                selectedColor: null,
              };
            }

            return {
              selectedColor: color,
            };
          }),
        toggleColorToFavorite: (id) =>
          set((state) => {
            if (state.favoriteColors.includes(id)) {
              return {
                favoriteColors: state.favoriteColors.filter(
                  (colorID) => colorID !== id
                ),
              };
            }

            return {
              favoriteColors: [...state.favoriteColors, id],
            };
          }),
        setColorFilters: (filter) =>
          set((state) => {
            if (state.colorFilters.has(filter)) {
              state.colorFilters.delete(filter);
            } else {
              state.colorFilters.add(filter);
              isColorSort(filter) &&
                getColorSortOpponents(filter).forEach((colorSortOpponent) =>
                  state.colorFilters.delete(colorSortOpponent)
                );
            }

            return {
              colorFilters: new Set(state.colorFilters),
            };
          }),
        filterColors: () =>
          set((state) => {
            let filteredColors = [...colors];
            filteredColors = applyColorSort(filteredColors, state.colorFilters);
            filteredColors = applyColorFilter(
              filteredColors,
              state.colorFilters,
              state.favoriteColors
            );

            return {
              filteredColors,
            };
          }),
        searchColors: (name) =>
          set((state) => {
            return {
              filteredColors: state.filteredColors.filter((color) =>
                color.name.toLowerCase().includes(name)
              ),
            };
          }),
      },
    }),
    {
      name: 'color-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        favoriteColors: state.favoriteColors,
      }),
    }
  )
);

export const useSelectedColor = () =>
  colorStore((state) => state.selectedColor);
export const useFavoriteColors = () =>
  colorStore((state) => state.favoriteColors);
export const useColorFilters = () => colorStore((state) => state.colorFilters);
export const useFilteredColors = () =>
  colorStore((state) => state.filteredColors);
export const useColorActions = () => colorStore((state) => state.actions);
