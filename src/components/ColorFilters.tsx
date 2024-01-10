import { Heart } from 'lucide-react';
import { useState } from 'react';

import { useColorActions } from '@/store/color';

import { ColorFilter } from '@/lib/types';
import { Button } from './ui/button';

export default function ColorFilters() {
  const [filters, setFilters] = useState<ColorFilter[]>([]);
  const colorActions = useColorActions();

  const handleFavoriteFilterClick = () => {
    let nextFilters: ColorFilter[];

    if (filters.includes('favorite')) {
      nextFilters = filters.filter((filter) => filter !== 'favorite');
      setFilters(nextFilters);
    } else {
      nextFilters = [...filters, 'favorite'];
      setFilters(nextFilters);
    }

    colorActions.filterColors(nextFilters);
  };

  return (
    <section className="flex justify-center items-center gap-1 w-fit p-1 mx-auto rounded-full shadow-md bg-slate-100">
      <Button
        size="icon"
        className="rounded-full shadow-md bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400"
        onClick={handleFavoriteFilterClick}
      >
        <Heart
          className={`shrink-0 h-4 w-4 ${
            filters.includes('favorite')
              ? 'text-red-600 fill-red-600'
              : 'fill-white'
          }`}
        />
      </Button>
    </section>
  );
}
