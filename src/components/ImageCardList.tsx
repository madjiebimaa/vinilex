import React, { useState } from 'react';

import ImageCard from './ImageCard';

import { cn } from '@/lib/utils';
import { useImages } from '@/store/image';

interface ImageCardListProps extends React.HTMLAttributes<HTMLElement> {}

const ImageCardList = React.forwardRef<HTMLElement, ImageCardListProps>(
  ({ className, ...props }, ref) => {
    const [isShowAllImages, setIsShowAllImages] = useState(false);
    const images = useImages();

    return (
      <section
        ref={ref}
        className={cn('flex flex-wrap justify-center gap-4', className)}
        {...props}
      >
        {images !== null && images.length >= 1 ? (
          <>
            {images
              .slice(0, isShowAllImages ? images.length : 3)
              .map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            {images.length > 3 ? (
              <div
                className="grid place-content-center h-40 md:w-40 w-32 bg-slate-100 text-black rounded-xl shadow-md cursor-pointer hover:brightness-90 transition-all duration-300"
                onClick={() => setIsShowAllImages((prevState) => !prevState)}
              >
                <p className="flex items-center justify-center gap-2 font-sans font-semibold text-xl">
                  {isShowAllImages ? 'Show Less' : `+ ${images.length - 3}`}
                </p>
              </div>
            ) : null}
          </>
        ) : null}
      </section>
    );
  }
);

export default ImageCardList;
