import { FileUp } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Image } from '@/lib/types';
import { cn, filesToImages } from '@/lib/utils';
import { useImageActions, useImages } from '@/store/image';

export default function DropZone() {
  const images = useImages();
  const imageActions = useImageActions();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length >= 1) {
        let nextImages: Image[];
        if (images !== null) {
          nextImages = [...images, ...filesToImages(acceptedFiles)];
        } else {
          nextImages = [...filesToImages(acceptedFiles)];
        }

        imageActions.setImages(nextImages);
      }
    },
    [images, imageActions]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/*': ['.png', '.jpg', '.webp', '.svg'],
      },
    });

  return (
    <div
      {...getRootProps({
        className: cn(
          'grid place-content-center max-w-[400px] py-5 md:py-10 px-10 md:px-20 mx-auto rounded-xl bg-slate-200 border-2 border-dashed border-slate-500 cursor-pointer hover:brightness-90 transition-all duration-300',
          isDragAccept && 'bg-green-400',
          isDragReject && 'bg-red-400'
        ),
      })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col justify-center items-center space-y-2">
        <FileUp className="shrink-0 h-10 w-10 mx-auto" />
        <p className="font-sans font-bold text-sm md:text-lg text-center uppercase">
          drop file here
        </p>
        <p className="font-sans text-xs md:text-sm text-center">
          Drag and drop your PNG, JPG, WebP, or SVG images here.
        </p>
      </div>
    </div>
  );
}
