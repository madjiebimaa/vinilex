import { Button, ButtonProps } from './ui/button';

import { Image } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useImageActions } from '@/store/image';
import { Trash } from 'lucide-react';
import { ElementRef, createRef } from 'react';

interface ImageCardProps {
  image: Image;
}

export default function ImageCard({ image }: ImageCardProps) {
  const imageRef = createRef<ElementRef<'img'>>();
  const imageActions = useImageActions();

  const bubbleButtonStyles: ButtonProps = {
    variant: 'secondary',
    size: 'icon',
    className: 'rounded-full hover:brightness-90 transition-all duration-300',
  };

  const bubbleWrapperStyles = {
    className:
      'flex justify-center items-center w-fit p-1 rounded-full shadow-md bg-slate-100',
  };

  // const handleOnLoad = () => {
  //   const image = imageRef.current
  //   if (image.)
  // }

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
      <div
        style={{
          backgroundColor:
            image.dominantColorHexCode !== null
              ? image.dominantColorHexCode
              : '',
        }}
        className={cn(
          bubbleWrapperStyles.className,
          'absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-100 ease-in group-hover/image-card:opacity-100 group-hover/image-card:transition-opacity group-hover/image-card:duration-300 group-hover/image-card:ease-out'
        )}
      >
        <Button
          {...bubbleButtonStyles}
          onClick={() => imageActions.removeImage(image.id)}
        >
          <Trash className="shrink-0 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
