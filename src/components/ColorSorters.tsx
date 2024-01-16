import {
  ArrowDown01,
  ArrowDownAz,
  ArrowUp10,
  ArrowUpZa,
  LucideIcon,
} from 'lucide-react';

import { Button } from './ui/button';

import { ColorFilter } from '@/lib/types';
import { useColorActions, useColorFilters } from '@/store/color';
import BubbleContainer from './BubbleContainer';

export default function ColorSorters() {
  const colorFilters = useColorFilters();
  const colorActions = useColorActions();

  const handleIncrementAlphabetClick = () => {
    colorActions.setColorFilters('increment-alphabet');
    colorActions.filterColors();
  };

  const handleDecrementAlphabetClick = () => {
    colorActions.setColorFilters('decrement-alphabet');
    colorActions.filterColors();
  };

  const handleIncrementNumberClick = () => {
    colorActions.setColorFilters('increment-number');
    colorActions.filterColors();
  };

  const handleDecrementNumberClick = () => {
    colorActions.setColorFilters('decrement-number');
    colorActions.filterColors();
  };

  const sorters: {
    label: ColorFilter;
    Icon: LucideIcon;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }[] = [
    {
      label: 'increment-alphabet',
      Icon: ArrowDownAz,
      onClick: handleIncrementAlphabetClick,
    },
    {
      label: 'decrement-alphabet',
      Icon: ArrowUpZa,
      onClick: handleDecrementAlphabetClick,
    },
    {
      label: 'increment-number',
      Icon: ArrowDown01,
      onClick: handleIncrementNumberClick,
    },
    {
      label: 'decrement-number',
      Icon: ArrowUp10,
      onClick: handleDecrementNumberClick,
    },
  ];

  return (
    <BubbleContainer className="gap-1">
      {sorters.map(({ label, Icon, onClick }, index) => (
        <Button
          key={label}
          variant="secondary"
          size="icon"
          className={`rounded-full hover:brightness-90 transition-all duration-300 ${
            colorFilters.has(label)
              ? 'text-white bg-red-600 hover:bg-red-600'
              : ''
          } ${sorters.length / 2 - 1 === index ? 'mr-2' : ''}`}
          onClick={onClick}
        >
          <Icon className={`shrink-0 h-4 w-4`} />
        </Button>
      ))}
    </BubbleContainer>
  );
}
