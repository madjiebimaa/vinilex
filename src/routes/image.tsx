import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import BubbleButton from '@/components/BubbleButton';
import BubbleContainer from '@/components/BubbleContainer';
import ClosestColorAreas from '@/components/ClosestColorAreas';
import DropZone from '@/components/DropZone';
import ImageCardList from '@/components/ImageCardList';

import { EMPTY_CODE, EMPTY_ID, EMPTY_NAME } from '@/lib/constants';
import { useSelectedColor } from '@/store/color';
import { useImages, useSelectedImage } from '@/store/image';

export default function Image() {
  const images = useImages();
  const selectedImage = useSelectedImage();
  const selectedColor = useSelectedColor();
  const navigate = useNavigate();

  const handleNavigateBackClick = () => {
    navigate(-1);
  };

  return (
    <main
      style={{
        color: selectedColor ? selectedColor.text.hexCode : '',
        backgroundColor: selectedColor
          ? selectedColor.background.hexCode
          : 'white',
      }}
      className="flex flex-col min-h-screen p-6 space-y-10 transition-colors duration-500"
    >
      <BubbleContainer>
        <BubbleButton onClick={handleNavigateBackClick}>
          <ArrowLeft className="shrink-0 h-4 w-4" />
        </BubbleButton>
      </BubbleContainer>
      <DropZone className="mx-auto" />
      <ImageCardList />
      {images !== null && images.length !== 0 && selectedImage !== null ? (
        <ClosestColorAreas
          color={{
            id: EMPTY_ID,
            name: EMPTY_NAME,
            code: EMPTY_CODE,
            hexCode: selectedImage.dominantColorHexCode!,
          }}
          className="mx-auto"
        />
      ) : null}
    </main>
  );
}
