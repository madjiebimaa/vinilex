import { Color } from '@/lib/types';

interface PaletteProps {
  color: Color;
}

export default function Palette({ color }: PaletteProps) {
  return (
    <div className="grid place-content-center">
      <div
        style={{ backgroundColor: color.hexCode }}
        className="h-20 w-20 rounded-full"
      />
    </div>
  );
}
