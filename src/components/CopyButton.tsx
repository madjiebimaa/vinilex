import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

import { Button, ButtonProps } from './ui/button';

interface CopyButtonProps extends ButtonProps {
  text: string;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, variant, size, text, ...props }, ref) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };

    const Icon = isCopied ? Check : Copy;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        onClick={handleCopyClick}
        {...props}
      >
        <Icon className="shrink-0 h-4 w-4" />
      </Button>
    );
  }
);

export default CopyButton;
