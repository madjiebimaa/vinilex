import Aside from '@/components/Aside';
import PaletteList from '@/components/PaletteList';

import { useSelectedColor } from '@/store/color';

export default function Root() {
  const selectedColor = useSelectedColor();

  return (
    <main
      style={{
        backgroundColor: selectedColor ? selectedColor.hexCode : 'white',
      }}
      className="flex flex-col md:flex-row min-h-screen"
    >
      <Aside />
      <PaletteList />
    </main>
  );
}
