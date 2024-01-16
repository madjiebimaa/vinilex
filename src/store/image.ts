import ColorThief from 'colorthief';
import { create } from 'zustand';

import { Image } from '@/lib/types';
import { RGBToHexCode } from '@/lib/utils';
import { createJSONStorage, persist } from 'zustand/middleware';

const colorThief = new ColorThief();

type ImageState = {
  images: Image[] | null;
  selectedImage: Image | null;
};

type ImageActions = {
  actions: {
    setImages: (images: Image[]) => void;
    removeImage: (id: Image['id']) => void;
    addDominantColorToImage: (
      id: Image['id'],
      imageRef: HTMLImageElement
    ) => void;
    selectImage: (image: Image) => void;
  };
};

const intialState: ImageState = {
  images: null,
  selectedImage: null,
};

const imageStore = create<ImageState & ImageActions>()(
  persist(
    (set) => ({
      ...intialState,
      actions: {
        setImages: (images) => set({ images }),
        removeImage: (id) =>
          set((state) => ({
            images:
              state.images !== null && state.images.length >= 1
                ? state.images.filter((image) => image.id !== id)
                : state.images,
            selectedImage:
              state.selectedImage && state.selectedImage.id === id
                ? null
                : state.selectedImage,
          })),
        addDominantColorToImage: (id, imageRef) =>
          set((state) => {
            if (state.images !== null && state.images.length >= 0) {
              return {
                images: state.images.map((image) => {
                  if (image.id === id) {
                    const [r, g, b] = colorThief.getColor(imageRef);
                    image.dominantColorHexCode = RGBToHexCode({ r, g, b });
                  }

                  return image;
                }),
              };
            }

            return state;
          }),
        selectImage: (image) => set({ selectedImage: image }),
      },
    }),
    {
      name: 'image-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        images: state.images,
      }),
    }
  )
);

export const useImages = () => imageStore((state) => state.images);
export const useSelectedImage = () =>
  imageStore((state) => state.selectedImage);
export const useImageActions = () => imageStore((state) => state.actions);
