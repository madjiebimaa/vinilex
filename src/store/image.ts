import { Image } from '@/lib/types';
import { create } from 'zustand';

type ImageState = {
  images: Image[] | null;
};

type ImageActions = {
  actions: {
    setImages: (images: Image[]) => void;
  };
};

const intialState: ImageState = {
  images: null,
};

const fileStore = create<ImageState & ImageActions>()((set) => ({
  ...intialState,
  actions: {
    setImages: (images) => set({ images }),
  },
}));

export const useImages = () => fileStore((state) => state.images);
export const useImageActions = () => fileStore((state) => state.actions);
