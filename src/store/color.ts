import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import colors from '../data/colors.json';
import { Color, ColorFilter } from './../lib/types';

type ColorState = {
  selectedColor: Color | null;
  favoriteColors: Color['id'][];
  filteredColors: Color[];
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
    toggleColorToFavorite: (id: Color['id']) => void;
    filterColors: (filters: ColorFilter[]) => void;
  };
};

const initialState: ColorState = {
  selectedColor: null,
  favoriteColors: [],
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
        filterColors: (filters) =>
          set((state) => {
            if (filters.includes('favorite')) {
              return {
                filteredColors: colors.filter((color) =>
                  state.favoriteColors.includes(color.id)
                ),
              };
            }

            return {
              filteredColors: colors,
            };
          }),
      },
    }),
    {
      name: 'color-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ favoriteColors: state.favoriteColors }),
    }
  )
);

export const useSelectedColor = () =>
  colorStore((state) => state.selectedColor);
export const useFavoriteColors = () =>
  colorStore((state) => state.favoriteColors);
export const useFilteredColors = () =>
  colorStore((state) => state.filteredColors);
export const useColorActions = () => colorStore((state) => state.actions);
