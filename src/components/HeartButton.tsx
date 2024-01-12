import { Heart } from 'lucide-react';
import React from 'react';

import { Button, ButtonProps } from './ui/button';

import {
  useColorActions,
  useColorFilters,
  useFavoriteColors,
} from '@/store/color';

interface HeartButtonProps extends ButtonProps {
  colorID: string;
}

export const HeartButton = React.forwardRef<
  HTMLButtonElement,
  HeartButtonProps
>(({ className, variant, size, colorID, ...props }, ref) => {
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
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      {...props}
    >
      <Heart
        className={`shrink-0 h-4 w-4 ${
          isFavoriteColor ? 'text-red-600 fill-red-600' : 'fill-white'
        }`}
      />
    </Button>
  );
});

export default HeartButton;
