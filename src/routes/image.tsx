import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ClosestColorAreas from '@/components/ClosestColorAreas';
import DropZone from '@/components/DropZone';
import ImageCardList from '@/components/ImageCardList';
import { Button, ButtonProps } from '@/components/ui/button';

import { NOT_FOUND_CODE, NOT_FOUND_ID, NOT_FOUND_NAME } from '@/lib/constants';
import { useImages, useSelectedImage } from '@/store/image';

export default function Image() {
  const images = useImages()
  const selectedImage = useSelectedImage();
  const navigate = useNavigate();

  const bubbleButtonStyles: ButtonProps = {
    variant: 'secondary',
    size: 'icon',
    className: 'rounded-full hover:brightness-90 transition-all duration-300',
  };

  const bubbleWrapperStyles = {
    className:
      'flex justify-center items-center w-fit p-1 rounded-full shadow-md bg-slate-100',
  };

  return (
    <main className="flex flex-col min-h-screen p-6 space-y-10">
      <div {...bubbleWrapperStyles}>
        <Button {...bubbleButtonStyles} onClick={() => navigate(-1)}>
          <ArrowLeft className="shrink-0 h-4 w-4" />
        </Button>
      </div>
      <DropZone />
      <ImageCardList />
      {images !== null && images.length !== 0 && selectedImage !== null ? (
        <div className="mx-auto">
          <ClosestColorAreas
            color={{
              id: NOT_FOUND_ID,
              name: NOT_FOUND_NAME,
              code: NOT_FOUND_CODE,
              hexCode: selectedImage.dominantColorHexCode!,
            }}
          />
        </div>
      ) : null}
    </main>
  );
}
