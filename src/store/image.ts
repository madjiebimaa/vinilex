import { Image } from '@/lib/types';
import { create } from 'zustand';

type ImageState = {
  images: Image[] | null;
};

type ImageActions = {
  actions: {
    setImages: (images: Image[]) => void;
    removeImage: (id: Image['id']) => void;
  };
};

const intialState: ImageState = {
  images: null,
};

const fileStore = create<ImageState & ImageActions>()((set) => ({
  ...intialState,
  actions: {
    setImages: (images) => set({ images }),
    removeImage: (id) =>
      set((state) => ({
        images:
          state.images !== null && state.images.length >= 1
            ? state.images.filter((image) => image.id !== id)
            : state.images,
      })),
  },
}));

export const useImages = () => fileStore((state) => state.images);
export const useImageActions = () => fileStore((state) => state.actions);
