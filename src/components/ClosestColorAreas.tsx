import { Home } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import CopyButton from './CopyButton';
import HeartButton from './HeartButton';
import { Button, ButtonProps, buttonVariants } from './ui/button';

import { Color } from '@/lib/types';
import { cn, getTopNClosestColors } from '@/lib/utils';
import { useColors } from '@/store/color';

const areas: string[] = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'home',
  'heart',
  'copy',
];

interface ClosestColorAreasProps {
  color: Color;
}

export default function ClosestColorAreas({ color }: ClosestColorAreasProps) {
  const navigate = useNavigate();
  const colors = useColors();

  const closestColors = getTopNClosestColors(color, colors);

  const colorAreas = areas.slice(0, 5).map((area, index) => ({
    area,
    ...closestColors[index],
  }));

  const toolStyles: ButtonProps = {
    variant: 'secondary',
    size: 'icon',
    className: 'rounded-full hover:brightness-90 transition-all duration-300',
  };

  const tools: {
    Tool: React.ReactNode;
  }[] = [
    {
      Tool: (
        <Button {...toolStyles} onClick={() => navigate('/')}>
          <Home className="shrink-0 h-4 w-4" />
        </Button>
      ),
    },
    {
      Tool: <HeartButton {...toolStyles} colorID={color.id} />,
    },
    {
      Tool: <CopyButton {...toolStyles} text={color.hexCode} />,
    },
  ];

  const toolAreas = areas.slice(5, areas.length).map((area, index) => ({
    area,
    ...tools[index],
  }));

  return (
    <section
      style={{
        gridTemplateAreas: `
        "hexCode hexCode hexCode hexCode hexCode two two two home home"
        "hexCode hexCode hexCode hexCode hexCode two two two home home"
        "one one one one one two two two heart heart"
        "one one one one one three three four heart heart"
        "one one one one one three three five copy copy"
        "one one one one one a a a copy copy"
        "one one one one one a a a b b"
      `,
      }}
      className="grid grid-cols-[repeat(10,_20px)] grid-rows-[repeat(7,_20px)] gap-2"
    >
      <div
        style={{ gridArea: 'hexCode' }}
        className="flex justify-center items-center w-fit p-1 rounded-full shadow-md bg-slate-100"
      >
        <p
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'h-10 rounded-full bg-white font-sans font-semibold hover:bg-white'
          )}
        >
          {color.hexCode}
        </p>
      </div>
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
      {toolAreas.map(({ area, Tool }) => (
        <div
          key={area}
          style={{ gridArea: area }}
          className="flex justify-center items-center p-1 rounded-full shadow-md bg-slate-100"
        >
          {Tool}
        </div>
      ))}
    </section>
  );
}
