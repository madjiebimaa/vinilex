import { Color } from '@/lib/types';
import { useColorActions } from '@/store/color';
import { Brush, Check, Copy, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface PaletteToolsProps {
  color: Color;
}

export default function PaletteTools({ color }: PaletteToolsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const colorActions = useColorActions();

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(color.hexCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const tools: {
    Icon: LucideIcon;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }[] = [
    {
      Icon: isCopied ? Check : Copy,
      onClick: handleCopyClick,
    },
    {
      Icon: Brush,
      onClick: () => colorActions.selectColor(color),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-1 p-1 rounded-full shadow-md bg-slate-100 opacity-0 transition-opacity duration-100 ease-in group-hover/palette:opacity-100 group-hover/palette:transition-opacity group-hover/palette:duration-1000 group-hover/palette:ease-out">
      {tools.map(({ Icon, onClick }) => (
        <Button
          key={`${color.id}_${Icon.displayName}`}
          variant="secondary"
          size="icon"
          className="rounded-full hover:brightness-90 transition-all duration-300"
          onClick={onClick}
        >
          <Icon className="shrink-0 h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
