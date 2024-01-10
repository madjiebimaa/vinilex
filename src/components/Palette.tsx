import { Color } from '@/lib/types';
import PaletteTools from './PaletteTools';

interface PaletteProps {
  color: Color;
}

export default function Palette({ color }: PaletteProps) {
  return (
    <div className="group/palette gap-2">
      <div className="flex flex-col justify-center items-center gap-2">
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
