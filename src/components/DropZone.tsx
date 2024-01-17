import { FileUp } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import { cn, filesToImages, rejectedFilesToFileErrors } from '@/lib/utils';
import { useImageActions, useImages } from '@/store/image';
import { useToast } from './ui/use-toast';

interface DropZoneProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>(
  ({ className, ...props }, ref) => {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const images = useImages();
    const imageActions = useImageActions();
    const { toast } = useToast();

    const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        const setImages = async (acceptedFiles: File[]) => {
          if (acceptedFiles && acceptedFiles.length >= 1) {
            const convertedImages = await filesToImages(acceptedFiles);
            const nextImages =
              images !== null
                ? [...images, ...convertedImages]
                : [...convertedImages];

            imageActions.setImages(nextImages);
          }

          if (fileRejections && fileRejections.length >= 1) {
            setRejectedFiles(fileRejections);
          }
        };

        setImages(acceptedFiles);
      },
      [images, imageActions]
    );

    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
      useDropzone({
        onDrop,
        maxSize: 100 * 1000, // 100 kB
        maxFiles: 1,
        accept: {
          'image/*': ['.png', '.jpg', '.webp', '.svg'],
        },
      });

    useEffect(() => {
      const errors = rejectedFilesToFileErrors(rejectedFiles);
      errors.forEach((error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `${error}.`,
        });
      });
    }, [rejectedFiles, toast]);

    return (
      <div
        {...getRootProps({
          ref,
          className: cn(
            'grid place-content-center max-w-[400px] py-5 md:py-10 px-8 md:px-20 rounded-xl shadow-md bg-slate-200 text-black border-2 border-dashed border-slate-500 cursor-pointer hover:brightness-90 transition-all duration-300',
            isDragAccept && 'bg-green-400',
            isDragReject && 'bg-red-400',
            className
          ),
          ...props,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center space-y-2">
          <FileUp className="shrink-0 h-10 w-10 mx-auto" />
          <p className="font-sans font-bold text-sm md:text-lg text-center uppercase">
            drop file here
          </p>
          <div className="font-sans text-xs md:text-sm text-center">
            <p>
              Drag and drop your <span className="font-semibold">PNG</span>,{' '}
              <span className="font-semibold">JPG</span>,{' '}
              <span className="font-semibold">WebP</span>, or{' '}
              <span className="font-semibold">SVG</span> images here.
            </p>
            <p>
              Up to <span className="font-semibold">100 kB</span> and dropped{' '}
              <span className="font-semibold">10 files</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default DropZone;
