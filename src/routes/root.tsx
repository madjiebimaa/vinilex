import Aside from '@/components/Aside';
import PaletteList from '@/components/PaletteList';

import { useSelectedColor } from '@/store/color';

export default function Root() {
  const selectedColor = useSelectedColor();

  return (
    <main
      style={{
        color: selectedColor ? selectedColor.text.hexCode : '',
        backgroundColor: selectedColor
          ? selectedColor.background.hexCode
          : 'white',
      }}
      className="flex flex-col md:flex-row min-h-screen transition-colors duration-500"
    >
      <Aside />
      <PaletteList />
    </main>
  );
}
