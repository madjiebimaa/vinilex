import { Brush, Link, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import BubbleButton from './BubbleButton';
import BubbleContainer from './BubbleContainer';
import CopyButton from './CopyButton';

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

  return (
    <BubbleContainer className="gap-1 opacity-0 transition-opacity duration-100 ease-in group-hover/palette:opacity-100 group-hover/palette:transition-opacity group-hover/palette:duration-1000 group-hover/palette:ease-out">
      <CopyButton text={color.hexCode} />

      {tools.map(({ Icon, onClick }) => (
        <BubbleButton key={`${color.id}_${Icon.displayName}`} onClick={onClick}>
          <Icon className="shrink-0 h-4 w-4" />
        </BubbleButton>
      ))}
    </BubbleContainer>
  );
}
