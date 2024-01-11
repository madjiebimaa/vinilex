import { ArrowLeft, Home } from 'lucide-react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn, getTopNClosestColors } from '@/lib/utils';
import { useColors } from '@/store/color';

export default function Color() {
  const navigate = useNavigate();
  const { colorID } = useParams();
  const colors = useColors();

  const color = colors.find((color) => color.id === colorID)!;
  const closestColors = getTopNClosestColors(color, colors);

  const areas: string[] = ['one', 'two', 'three', 'four', 'five'];
  const colorAreas = areas.map((area, index) => ({
    area,
    ...closestColors[index],
  }));

  return (
    <main
      style={{ backgroundColor: color.hexCode }}
      className="h-screen w-screen flex flex-col p-4 gap-4"
    >
      <nav className="flex items-center gap-2">
        <div className="flex justify-center items-center p-1 rounded-full shadow-md bg-slate-100">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full hover:brightness-90 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="shrink-0 h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4 p-1 rounded-full shadow-md bg-slate-100">
          <p
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'h-10 rounded-full bg-white font-sans font-semibold hover:bg-white'
            )}
          >
            {color.name}
          </p>
          <p
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'h-10 rounded-full bg-white font-sans font-semibold hover:bg-white'
            )}
          >
            {color.code}
          </p>
        </div>
      </nav>
      <section
        style={{
          gridTemplateAreas: `
            "one one one one one two two two home home"
            "one one one one one two two two home home"
            "one one one one one two two two _ _"
            "one one one one one three three four _ _"
            "one one one one one three three five _ _"
          `,
        }}
        className="grid grid-cols-[repeat(10,_20px)] grid-rows-[repeat(8,_20px)] gap-2"
      >
        {colorAreas.map((colorArea) => (
          <NavLink
            key={colorArea.id}
            to={`/colors/${colorArea.id}`}
            style={{
              gridArea: colorArea.area,
              backgroundColor: colorArea.hexCode,
            }}
            className="rounded-full shadow-md"
          />
        ))}
        <div
          style={{ gridArea: 'home' }}
          className="flex justify-center items-center p-1 rounded-full shadow-md bg-slate-100"
        >
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full hover:brightness-90 transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <Home className="shrink-0 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
