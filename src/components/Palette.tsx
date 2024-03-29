import HeartButton from './HeartButton';
import PaletteTools from './PaletteTools';

import { Color } from '@/lib/types';

interface PaletteProps {
  color: Color;
}

export default function Palette({ color }: PaletteProps) {
  return (
    <div className="group/palette relative min-w-[130px] max-w-[200px] mx-auto">
      <HeartButton
        colorID={color.id}
        className="h-auto w-auto bg-transparent hover:bg-transparent hover:brightness-100 absolute top-0 right-0 opacity-0 transition-opacity duration-100 ease-in group-hover/palette:opacity-100 group-hover/palette:transition-opacity group-hover/palette:duration-300 group-hover/palette:ease-out"
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <div
          style={{ backgroundColor: color.hexCode }}
          className="h-20 w-20 rounded-full shadow-md transition-transform duration-100 ease-in group-hover/palette:scale-110 group-hover/palette:transition-transform group-hover/palette:duration-300 group-hover/palette:ease-out"
        />

        <div className="w-full flex justify-between items-center font-sans font-medium text-xs">
          <p>{color.name}</p>
          <p>{color.code}</p>
        </div>
        <PaletteTools color={color} />
      </div>
    </div>
  );
}
