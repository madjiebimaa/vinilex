import Aside from '@/components/Aside';
import PaletteList from '@/components/PaletteList';

import { getOppositeContrast, hexCodeToRGB, toGrayScale } from '@/lib/utils';
import { useSelectedColor } from '@/store/color';

export default function Root() {
  const selectedColor = useSelectedColor();

  return (
    <main
      style={{
        color: selectedColor
          ? getOppositeContrast(
              toGrayScale(hexCodeToRGB(selectedColor.hexCode))
            )
          : '',
        backgroundColor: selectedColor ? selectedColor.hexCode : 'white',
      }}
      className="flex flex-col md:flex-row min-h-screen transition-colors duration-500"
    >
      <Aside />
      <PaletteList />
    </main>
  );
}
