import { Color } from '@/lib/types';
import { create } from 'zustand';

type ColorState = {
  selectedColor: Color | null;
  favoriteColors: Color['id'][];
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
    toggleColorToFavorite: (id: Color['id']) => void;
  };
};

const initialState: ColorState = {
  selectedColor: null,
  favoriteColors: [],
};

const colorStore = create<ColorState & ColorActions>()((set) => ({
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
  },
}));

export const useSelectedColor = () =>
  colorStore((state) => state.selectedColor);
export const useFavoriteColors = () =>
  colorStore((state) => state.favoriteColors);
export const useColorActions = () => colorStore((state) => state.actions);
