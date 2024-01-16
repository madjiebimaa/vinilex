import { Heart, Search } from 'lucide-react';

import ColorSorters from './ColorSorters';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { useColorActions, useColorFilters } from '@/store/color';
import BubbleContainer from './BubbleContainer';

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
    if (event.key === 'Enter') {
      event.preventDefault();

      const element = event.target as HTMLInputElement;
      element.blur();
    }

    if (event.key === 'Backspace') {
      colorActions.filterColors();
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-2 w-full mx-auto mt-4">
      <BubbleContainer className="relative w-full">
        <Search className="absolute left-4 top-4 h-4 w-4 text-slate-500" />
        <Input
          type="text"
          onChange={handleQueryChange}
          onKeyDown={handleQueryKeyDown}
          placeholder="Search"
          className="pl-10 rounded-full border-none text-black"
        />
      </BubbleContainer>
      <div className="flex items-center md:justify-between gap-2 sm w-full">
        <BubbleContainer>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full hover:brightness-90 transition-all duration-300"
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
        </BubbleContainer>
        <ColorSorters />
      </div>
    </section>
  );
}
