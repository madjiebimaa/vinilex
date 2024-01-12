import { NavLink } from 'react-router-dom';

import { Color } from '@/lib/types';
import { getTopNClosestColors } from '@/lib/utils';
import { useColors } from '@/store/color';

const areas: string[] = ['one', 'two', 'three', 'four', 'five'];

interface ClosestColorAreasProps {
  color: Color;
}

export default function ClosestColorAreas({ color }: ClosestColorAreasProps) {
  const colors = useColors();

  const closestColors = getTopNClosestColors(color, colors);

  const colorAreas = areas.slice(0, 5).map((area, index) => ({
    area,
    ...closestColors[index],
  }));

  return (
    <section
      style={{
        gridTemplateAreas: `
        "one one one one one two   two   two  five c"
        "one one one one one two   two   two  b    c"
        "one one one one one two   two   two  b    c"
        "one one one one one three three four b    c"
        "one one one one one three three a    b    c"
      `,
      }}
      className="grid grid-cols-[repeat(10,_20px)] grid-rows-[repeat(5,_20px)] gap-2"
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
    </section>
  );
}
