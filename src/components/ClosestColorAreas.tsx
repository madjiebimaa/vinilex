import { NavLink } from 'react-router-dom';

import { Color } from '@/lib/types';
import { generateGrid, getTopNClosestColors } from '@/lib/utils';
import { useColors } from '@/store/color';

interface ClosestColorAreasProps {
  color: Color;
}

export default function ClosestColorAreas({ color }: ClosestColorAreasProps) {
  const colors = useColors();

  const closestColors = getTopNClosestColors(color, colors);

  const numberOfBubbles = 1;
  const grid = generateGrid(10, numberOfBubbles);
  const bubbles = grid.items.map((item, index) => ({
    item,
    ...closestColors[index],
  }));

  return (
    <section className="grid grid-rows-[repeat(10,_20px)] grid-cols-[repeat(10,_20px)] place-content-center place-items-center gap-2 w-fit">
      {bubbles.map((bubble) => (
        <NavLink
          key={bubble.id}
          to={`/colors/${bubble.id}`}
          style={{
            ...bubble.item,
            backgroundColor: bubble.hexCode,
          }}
          className="w-full h-full rounded-full shadow-md"
        />
      ))}
    </section>
  );
}
