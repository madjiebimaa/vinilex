import { Color } from '@/lib/types';
import { create } from 'zustand';

type ColorState = {
  selectedColor: Color | null;
};

type ColorActions = {
  actions: {
    selectColor: (color: Color) => void;
  };
};

const initialState: ColorState = {
  selectedColor: null,
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
  },
}));

export const useSelectedColor = () =>
  colorStore((state) => state.selectedColor);
export const useColorActions = () => colorStore((state) => state.actions);
