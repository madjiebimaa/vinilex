import { Heart, Search } from 'lucide-react';

import { useColorActions, useColorFilters } from '@/store/color';

import ColorSorters from './ColorSorters';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function ColorFilters() {
  const colorFilters = useColorFilters();
  const colorActions = useColorActions();

  const handleFavoriteFilterClick = () => {
    colorActions.setColorFilters('favorite');
    colorActions.filterColors();
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    colorActions.searchColors(event.target.value);
  };

  const handleQueryKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      colorActions.filterColors();
    }
  };

  return (
    <form className="flex flex-col justify-center items-center gap-2 w-full mx-auto mt-4">
      <div className="relative w-full p-1 rounded-full shadow-md bg-slate-100">
        <Search className="absolute left-4 top-4 h-4 w-4 text-slate-500" />
        <Input
          type="text"
          onChange={handleQueryChange}
          onKeyDown={handleQueryKeyDown}
          placeholder="Search"
          className="pl-10 rounded-full border-none"
        />
      </div>
      <div className="flex items-center md:justify-between gap-2 sm w-full">
        <div className="flex justify-center items-center w-fit p-1 rounded-full shadow-md bg-slate-100">
          <Button
            type="button"
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
      </div>
    </form>
  );
}
