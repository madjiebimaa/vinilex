import DropZone from '@/components/DropZone';
import { Button, ButtonProps } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Image() {
  const navigate = useNavigate();

  const bubbleButtonStyles: ButtonProps = {
    variant: 'secondary',
    size: 'icon',
    className: 'rounded-full hover:brightness-90 transition-all duration-300',
  };

  const bubbleWrapperStyles = {
    className:
      'flex justify-center items-center w-fit p-1 rounded-full shadow-md bg-slate-100',
  };

  return (
    <main className="flex flex-col min-h-screen p-4 space-y-4">
      <div {...bubbleWrapperStyles}>
        <Button {...bubbleButtonStyles} onClick={() => navigate(-1)}>
          <ArrowLeft className="shrink-0 h-4 w-4" />
        </Button>
      </div>
      <DropZone />
    </main>
  );
}
