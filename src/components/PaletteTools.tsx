import { Brush, Link, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import CopyButton from './CopyButton';
import { Button, ButtonProps } from './ui/button';

import { Color } from '@/lib/types';
import { useColorActions } from '@/store/color';

interface PaletteToolsProps {
  color: Color;
}

export default function PaletteTools({ color }: PaletteToolsProps) {
  const colorActions = useColorActions();
  const navigate = useNavigate();

  const tools: {
    Icon: LucideIcon;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }[] = [
    {
      Icon: Brush,
      onClick: () => colorActions.selectColor(color),
    },
    {
      Icon: Link,
      onClick: () => navigate(`/colors/${color.id}`),
    },
  ];

  const toolStyles: ButtonProps = {
    variant: 'secondary',
    size: 'icon',
    className: 'rounded-full hover:brightness-90 transition-all duration-300',
  };

  return (
    <div className="grid grid-cols-3 gap-1 p-1 rounded-full shadow-md bg-slate-100 opacity-0 transition-opacity duration-100 ease-in group-hover/palette:opacity-100 group-hover/palette:transition-opacity group-hover/palette:duration-1000 group-hover/palette:ease-out">
      <CopyButton {...toolStyles} text={color.hexCode} />

      {tools.map(({ Icon, onClick }) => (
        <Button
          key={`${color.id}_${Icon.displayName}`}
          {...toolStyles}
          onClick={onClick}
        >
          <Icon className="shrink-0 h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
