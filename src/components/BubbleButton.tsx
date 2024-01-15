import React from 'react';

import { Button, ButtonProps } from './ui/button';

import { cn } from '@/lib/utils';

interface BubbleButtonProps extends ButtonProps {}

const BubbleButton = React.forwardRef<HTMLButtonElement, BubbleButtonProps>(
  ({ className, variant = 'secondary', size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'p-1 rounded-full bg-slate-100 hover:brightness-90 transition-all duration-300',
          className
        )}
        {...props}
      />
    );
  }
);

export default BubbleButton;
