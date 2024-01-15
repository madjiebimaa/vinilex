import { Heart } from 'lucide-react';
import React from 'react';

import { ButtonProps } from './ui/button';

import {
  useColorActions,
  useColorFilters,
  useFavoriteColors,
} from '@/store/color';
import BubbleButton from './BubbleButton';

interface HeartButtonProps extends ButtonProps {
  colorID: string;
}

export const HeartButton = React.forwardRef<
  HTMLButtonElement,
  HeartButtonProps
>(({ className, variant = 'ghost', colorID, ...props }, ref) => {
  const favoriteColors = useFavoriteColors();
  const colorActions = useColorActions();
  const colorFilters = useColorFilters();

  const isFavoriteColor = favoriteColors.includes(colorID);

  const handleClick = () => {
    colorActions.toggleColorToFavorite(colorID);
    if (colorFilters.has('favorite')) {
      colorActions.filterColors();
    }
  };

  return (
    <BubbleButton
      ref={ref}
      variant={variant}
      className={className}
      onClick={handleClick}
      {...props}
    >
      <Heart
        className={`shrink-0 h-4 w-4 ${
          isFavoriteColor ? 'text-red-600 fill-red-600' : 'fill-white'
        } transition-colors duration-300`}
      />
    </BubbleButton>
  );
});

export default HeartButton;
