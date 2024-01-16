import { NavLink } from 'react-router-dom';

import { Bubbles, Color } from '@/lib/types';
import { cn, generateGrid, getTopNClosestColors } from '@/lib/utils';
import { useColors } from '@/store/color';
import { useEffect, useState } from 'react';

interface ClosestColorAreasProps {
  color: Color;
  className?: string;
}

export default function ClosestColorAreas({
  color,
  className,
}: ClosestColorAreasProps) {
  const [bubbles, setBubbles] = useState<Bubbles | null>(null);
  const colors = useColors();

  useEffect(() => {
    const numberOfBubbles = 20;
    const bubbleSizes = [4, 3, 2, ...Array(numberOfBubbles - 3).fill(1)];
    const closestColors = getTopNClosestColors(color, colors, numberOfBubbles);

    const grid = generateGrid(10, bubbleSizes, numberOfBubbles);
    setBubbles(
      grid
        .sort((a, b) => {
          const sizeA = a.gridRowEnd - a.gridRowStart;
          const sizeB = b.gridRowEnd - b.gridRowStart;
          return sizeA - sizeB;
        })
        .map((item, index) => ({
          item,
          ...closestColors[index],
        }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color.hexCode]);

  return (
    <section
      className={cn(
        'grid grid-rows-[repeat(10,_20px)] grid-cols-[repeat(10,_20px)] place-content-center place-items-center gap-2 w-fit',
        className
      )}
    >
      {bubbles !== null
        ? bubbles.map((bubble) => (
            <NavLink
              key={bubble.id}
              to={`/colors/${bubble.id}`}
              style={{
                ...bubble.item,
                backgroundColor: bubble.hexCode,
              }}
              className="w-full h-full rounded-full shadow-md transition-transform duration-100 ease-in hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-out"
            />
          ))
        : null}
    </section>
  );
}
