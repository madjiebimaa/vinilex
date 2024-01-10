import { Github } from 'lucide-react';

import { Button } from './ui/button';
import ColorFilters from './ColorFilters';

export default function Aside() {
  return (
    <aside className="flex flex-col gap-4 p-4 md:p-6 md:sticky md:top-0 md:h-screen md:max-w-[300px]">
      <header className="flex flex-col space-y-4">
        <p className="font-mono text-sm md:text-base">
          <strong className="font-bold text-lg md:text-xl text-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400 bg-clip-text">
            Vinilex
          </strong>{' '}
          is the ultimate emulsion paint by Nippon Paints, perfect for
          transforming both interior and exterior spaces.
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md hover:brightness-90 transition-all duration-300"
          >
            <a href="https://github.com/madjiebimaa/vinilex" target="_blank">
              <Github className="shrink-0 h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-10 rounded-full shadow-md hover:brightness-90 transition-all duration-300"
          >
            <a href="https://github.com/madjiebimaa" target="_blank">
              Become a sponsor
            </a>
          </Button>
        </div>
      </header>
      <ColorFilters />
    </aside>
  );
}
