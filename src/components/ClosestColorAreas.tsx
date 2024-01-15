import { NavLink } from 'react-router-dom';

import { Color } from '@/lib/types';
import { generateGrid, getTopNClosestColors } from '@/lib/utils';
import { useColors } from '@/store/color';

interface ClosestColorAreasProps {
  color: Color;
}

export default function ClosestColorAreas({ color }: ClosestColorAreasProps) {
  const colors = useColors();

  const numberOfBubbles = 20;
  const bubbleSizes = [4, 3, 2, ...Array(numberOfBubbles - 3).fill(1)];
  const closestColors = getTopNClosestColors(color, colors, numberOfBubbles);

  const grid = generateGrid(10, bubbleSizes, numberOfBubbles);
  const bubbles = grid
    .sort((a, b) => {
      const sizeA = a.gridRowEnd - a.gridRowStart;
      const sizeB = b.gridRowEnd - b.gridRowStart;
      return sizeA - sizeB;
    })
    .map((item, index) => ({
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
          className="w-full h-full rounded-full shadow-md transition-transform duration-100 ease-in hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-out"
        />
      ))}
    </section>
  );
}
