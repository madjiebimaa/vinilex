import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface BubbleContainerProps extends HTMLAttributes<HTMLDivElement> {}

const BubbleContainer = forwardRef<HTMLDivElement, BubbleContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex justify-center items-center w-fit p-1 rounded-full shadow-md bg-slate-100',
          className
        )}
        {...props}
      />
    );
  }
);

export default BubbleContainer;
