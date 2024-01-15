import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

import BubbleButton from './BubbleButton';
import { ButtonProps } from './ui/button';

interface CopyButtonProps extends ButtonProps {
  text: string;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, text, ...props }, ref) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = async () => {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };

    const Icon = isCopied ? Check : Copy;

    return (
      <BubbleButton
        ref={ref}
        className={className}
        onClick={handleClick}
        {...props}
      >
        <Icon className="shrink-0 h-4 w-4" />
      </BubbleButton>
    );
  }
);

export default CopyButton;
