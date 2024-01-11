import {
  ArrowDown01,
  ArrowDownAz,
  ArrowUp10,
  ArrowUpZa,
  LucideIcon,
} from 'lucide-react';

import { ColorFilter } from '@/lib/types';
import { useColorActions, useColorFilters } from '@/store/color';

import { Button } from './ui/button';

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
    <div className="flex justify-center items-center gap-1 w-fit p-1 rounded-full shadow-md bg-slate-100">
      {sorters.map(({ label, Icon, onClick }, index) => (
        <Button
          key={label}
          type="button"
          variant="secondary"
          size="icon"
          className={`rounded-full bg-white hover:brightness-90 transition-all duration-300 ${
            colorFilters.has(label)
              ? 'text-white bg-red-600 hover:bg-red-600'
              : ''
          } ${sorters.length / 2 - 1 === index ? 'mr-2' : ''}`}
          onClick={onClick}
        >
          <Icon className={`shrink-0 h-4 w-4`} />
        </Button>
      ))}
    </div>
  );
}
