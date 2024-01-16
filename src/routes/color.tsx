import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import BubbleButton from '@/components/BubbleButton';
import BubbleContainer from '@/components/BubbleContainer';
import ClosestColorAreas from '@/components/ClosestColorAreas';
import CopyButton from '@/components/CopyButton';
import HeartButton from '@/components/HeartButton';
import { buttonVariants } from '@/components/ui/button';

import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useColors } from '@/store/color';

export default function Color() {
  const navigate = useNavigate();
  const { colorID } = useParams();
  const colors = useColors();

  const color = colors.find((color) => color.id === colorID)!;

  const bubbleLabelStyles = {
    className: cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'h-10 rounded-full bg-slate-100 font-sans font-semibold hover:bg-slate-100'
    ),
  };

  const colorLabels = [color.name, color.code];

  const bubbles: {
    Bubble: React.ReactNode;
  }[] = [
    {
      Bubble: (
        <BubbleButton onClick={() => navigate('/')}>
          <Home className="shrink-0 h-4 w-4" />
        </BubbleButton>
      ),
    },
    {
      Bubble: (
        <p className={cn(bubbleLabelStyles.className, 'w-[100px]')}>
          {color.hexCode}
        </p>
      ),
    },
    {
      Bubble: <CopyButton text={color.hexCode} />,
    },
    {
      Bubble: <HeartButton colorID={color.id} />,
    },
  ];

  return (
    <main
      style={{ backgroundColor: color.hexCode }}
      className="h-screen w-screen flex flex-col p-4 gap-4"
    >
      <nav className="flex items-center gap-2">
        <BubbleContainer>
          <BubbleButton onClick={() => navigate(-1)}>
            <ArrowLeft className="shrink-0 h-4 w-4" />
          </BubbleButton>
        </BubbleContainer>
        <BubbleContainer className="gap-2">
          {colorLabels.map((label) => (
            <p key={label} {...bubbleLabelStyles}>
              {label}
            </p>
          ))}
        </BubbleContainer>
      </nav>
      <div className="flex items-center gap-2">
        {bubbles.map(({ Bubble }, index) => (
          <BubbleContainer key={`${color.id}_bubble_button_${index}`}>
            {Bubble}
          </BubbleContainer>
        ))}
      </div>
      <ClosestColorAreas color={color} />
      <Footer />
    </main>
  );
}
