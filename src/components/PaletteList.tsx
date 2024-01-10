import { useFilteredColors } from '@/store/color';

import Footer from './Footer';
import Palette from './Palette';

export default function PaletteList() {
  const colors = useFilteredColors();
  
  return (
    <div className="flex-1 flex flex-col">
      <section className="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 py-6 px-4">
        {colors.map((color) => (
          <Palette key={color.id} color={color} />
        ))}
      </section>
      <Footer />
    </div>
  );
}
