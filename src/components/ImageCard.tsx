import { Trash } from 'lucide-react';
import { ElementRef, createRef } from 'react';

import BubbleButton from './BubbleButton';
import BubbleContainer from './BubbleContainer';

import { Image } from '@/lib/types';
import { getOppositeContrast } from '@/lib/utils';
import { useImageActions } from '@/store/image';

interface ImageCardProps {
  image: Image;
}

export default function ImageCard({ image }: ImageCardProps) {
  const imageRef = createRef<ElementRef<'img'>>();
  const imageActions = useImageActions();

  return (
    <div
      key={image.id}
      className="group/image-card relative h-40 w-full md:w-40 overflow-hidden rounded-xl"
    >
      <img
        ref={imageRef}
        src={image.preview}
        alt="Your uploaded image"
        className="h-full w-full object-cover cursor-pointer transition-transform ease-in duration-300 hover:scale-110 hover:transition-transform hover:duration-500 hover:ease-out"
        onLoad={() =>
          imageActions.addDominantColorToImage(image.id, imageRef.current!)
        }
        onClick={() => imageActions.selectImage(image)}
      />
      <BubbleContainer className="absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-100 ease-in group-hover/image-card:opacity-100 group-hover/image-card:transition-opacity group-hover/image-card:duration-300 group-hover/image-card:ease-out">
        <BubbleButton
          style={
            image.dominantColorHexCode
              ? {
                  backgroundColor: image.dominantColorHexCode,
                  color: getOppositeContrast(image.dominantColorHexCode),
                }
              : {}
          }
          onClick={() => imageActions.removeImage(image.id)}
        >
          <Trash className="shrink-0 h-4 w-4" />
        </BubbleButton>
      </BubbleContainer>
    </div>
  );
}
