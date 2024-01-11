import { Heart } from 'lucide-react';

import { useColorActions, useColorFilters } from '@/store/color';

import ColorSorters from './ColorSorters';
import { Button } from './ui/button';

export default function ColorFilters() {
  const colorFilters = useColorFilters();
  const colorActions = useColorActions();

  const handleFavoriteFilterClick = () => {
    colorActions.setColorFilters('favorite');
    colorActions.filterColors();
  };

  return (
    <section className="flex justify-center items-center gap-2 w-fit mx-auto">
      <div className="flex justify-center items-center gap-1 w-fit p-1 rounded-full shadow-md bg-slate-100">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white hover:brightness-90 transition-all duration-300"
          onClick={handleFavoriteFilterClick}
        >
          <Heart
            className={`shrink-0 h-4 w-4 ${
              colorFilters.has('favorite')
                ? 'text-red-600 fill-red-600'
                : 'fill-white'
            } transition-colors duration-300`}
          />
        </Button>
      </div>
      <ColorSorters />
    </section>
  );
}
