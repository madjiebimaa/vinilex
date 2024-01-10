import { Color } from '@/lib/types';
import { useColorActions, useFavoriteColors } from '@/store/color';
import { Heart } from 'lucide-react';
import PaletteTools from './PaletteTools';
import { Button } from './ui/button';

interface PaletteProps {
  color: Color;
}

export default function Palette({ color }: PaletteProps) {
  const favoriteColors = useFavoriteColors();
  const colorActions = useColorActions();

  const isFavoriteColor = favoriteColors.includes(color.id);

  return (
    <div className="group/palette relative gap-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-auto w-auto hover:bg-transparent dark:hover:bg-transparent rounded-full opacity-0 transition-opacity duration-100 ease-in group-hover/palette:opacity-100 group-hover/palette:transition-opacity group-hover/palette:duration-300 group-hover/palette:ease-out"
          onClick={() => colorActions.toggleColorToFavorite(color.id)}
        >
          <Heart
            className={`shrink-0 h-4 w-4 ${
              isFavoriteColor ? 'text-red-600 fill-red-600' : ''
            }`}
          />
        </Button>
        <div
          style={{ backgroundColor: color.hexCode }}
          className="h-20 w-20 rounded-full shadow-md transition-transform duration-100 ease-in group-hover/palette:scale-110 group-hover/palette:transition-transform group-hover/palette:duration-300 group-hover/palette:ease-out"
        />

        <div className="w-full flex justify-between items-center">
          <p className="font-sans font-medium text-xs">{color.name}</p>
          <p className="font-sans font-medium text-xs">{color.code}</p>
        </div>
        <PaletteTools color={color} />
      </div>
    </div>
  );
}
