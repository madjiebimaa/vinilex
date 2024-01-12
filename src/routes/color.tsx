import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import ClosestColorAreas from '@/components/ClosestColorAreas';
import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useColors } from '@/store/color';

export default function Color() {
  const navigate = useNavigate();
  const { colorID } = useParams();
  const colors = useColors();

  const color = colors.find((color) => color.id === colorID)!;
  const colorLabels = [color.name, color.code];

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
          {colorLabels.map((label) => (
            <p
              key={label}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'h-10 rounded-full bg-white font-sans font-semibold hover:bg-white'
              )}
            >
              {label}
            </p>
          ))}
        </div>
      </nav>
      <ClosestColorAreas color={color} />
    </main>
  );
}
