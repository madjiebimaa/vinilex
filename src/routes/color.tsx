import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import ClosestColorAreas from '@/components/ClosestColorAreas';
import CopyButton from '@/components/CopyButton';
import HeartButton from '@/components/HeartButton';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useColors } from '@/store/color';

export default function Color() {
  const navigate = useNavigate();
  const { colorID } = useParams();
  const colors = useColors();

  const color = colors.find((color) => color.id === colorID)!;

  const bubbleButtonStyles: ButtonProps = {
    variant: 'secondary',
    size: 'icon',
    className: 'rounded-full hover:brightness-90 transition-all duration-300',
  };

  const bubbleLabelStyles = {
    className: cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'h-10 rounded-full bg-white font-sans font-semibold hover:bg-white'
    ),
  };

  const bubbleWrapperStyles = {
    className:
      'flex justify-center items-center p-1 rounded-full shadow-md bg-slate-100',
  };

  const colorLabels = [color.name, color.code];

  const bubbles: {
    Bubble: React.ReactNode;
  }[] = [
    {
      Bubble: (
        <Button {...bubbleButtonStyles} onClick={() => navigate('/')}>
          <Home className="shrink-0 h-4 w-4" />
        </Button>
      ),
    },
    {
      Bubble: <p className={cn(bubbleLabelStyles.className, "w-[100px]")} >{color.hexCode}</p>,
    },
    {
      Bubble: <CopyButton {...bubbleButtonStyles} text={color.hexCode} />,
    },
    {
      Bubble: <HeartButton {...bubbleButtonStyles} colorID={color.id} />,
    },
  ];

  return (
    <main
      style={{ backgroundColor: color.hexCode }}
      className="h-screen w-screen flex flex-col p-4 gap-4"
    >
      <nav className="flex items-center gap-2">
        <div {...bubbleWrapperStyles}>
          <Button {...bubbleButtonStyles} onClick={() => navigate(-1)}>
            <ArrowLeft className="shrink-0 h-4 w-4" />
          </Button>
        </div>
        <div className={cn(bubbleWrapperStyles.className, 'gap-2')}>
          {colorLabels.map((label) => (
            <p key={label} {...bubbleLabelStyles}>
              {label}
            </p>
          ))}
        </div>
      </nav>
      <div className="flex items-center gap-2">
        {bubbles.map(({ Bubble }, index) => (
          <div
            key={`${color.id}_bubble_button_${index}`}
            {...bubbleWrapperStyles}
          >
            {Bubble}
          </div>
        ))}
      </div>
      <ClosestColorAreas color={color} />
    </main>
  );
}
