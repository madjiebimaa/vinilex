import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ClosestColorAreas from '@/components/ClosestColorAreas';
import DropZone from '@/components/DropZone';
import ImageCardList from '@/components/ImageCardList';

import BubbleButton from '@/components/BubbleButton';
import BubbleContainer from '@/components/BubbleContainer';
import { NOT_FOUND_CODE, NOT_FOUND_ID, NOT_FOUND_NAME } from '@/lib/constants';
import { useImages, useSelectedImage } from '@/store/image';

export default function Image() {
  const images = useImages();
  const selectedImage = useSelectedImage();
  const navigate = useNavigate();

  return (
    <main className="flex flex-col min-h-screen p-6 space-y-10">
      <BubbleContainer>
        <BubbleButton onClick={() => navigate(-1)}>
          <ArrowLeft className="shrink-0 h-4 w-4" />
        </BubbleButton>
      </BubbleContainer>
      <DropZone className="mx-auto" />
      <ImageCardList />
      {images !== null && images.length !== 0 && selectedImage !== null ? (
        <ClosestColorAreas
          color={{
            id: NOT_FOUND_ID,
            name: NOT_FOUND_NAME,
            code: NOT_FOUND_CODE,
            hexCode: selectedImage.dominantColorHexCode!,
          }}
          className="mx-auto"
        />
      ) : null}
    </main>
  );
}
