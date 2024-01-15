import { Github, Image } from 'lucide-react';

import ColorFilters from './ColorFilters';
import { buttonVariants } from './ui/button';

import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import BubbleContainer from './BubbleContainer';

export default function Aside() {
  return (
    <aside className="flex flex-col gap-4 p-4 md:p-6 md:sticky md:top-0 md:h-screen md:max-w-[300px]">
      <header className="flex flex-col space-y-4">
        <p className="font-mono text-sm md:text-base">
          <strong className="font-bold text-lg md:text-xl text-transparent bg-gradient-to-r from-red-600 via-yellow-600 to-purple-600 bg-clip-text">
            Vinilex
          </strong>{' '}
          is the ultimate emulsion paint by Nippon Paints, perfect for
          transforming both interior and exterior spaces.
        </p>
        <div className="flex items-center space-x-2">
          <BubbleContainer>
            <a
              href="https://github.com/madjiebimaa/vinilex"
              target="_blank"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'icon' }),
                'rounded-full hover:brightness-90 transition-all duration-300'
              )}
            >
              <Github className="shrink-0 h-4 w-4" />
            </a>
          </BubbleContainer>
          <BubbleContainer>
            <a
              href="https://github.com/madjiebimaa"
              target="_blank"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'h-10 rounded-full hover:brightness-90 transition-all duration-300'
              )}
            >
              Become a sponsor
            </a>
          </BubbleContainer>
        </div>
      </header>
      <ColorFilters />
      <BubbleContainer>
        <NavLink
          to={'/images'}
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'icon' }),
            'rounded-full hover:brightness-90 transition-all duration-300'
          )}
        >
          <Image className="shrink-0 h-4 w-4" />
        </NavLink>
      </BubbleContainer>
    </aside>
  );
}
