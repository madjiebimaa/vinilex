import Footer from './Footer';
import Palette from './Palette';

import { useFilteredColors } from '@/store/color';

export default function PaletteList() {
  const colors = useFilteredColors();

  return (
    <div className="flex-1 flex flex-col">
      <section className="flex-1 grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 py-6 px-4">
        {colors.length >= 1 ? (
          colors.map((color) => <Palette key={color.id} color={color} />)
        ) : (
          <div className="grid place-content-center px-8">
            <p className="font-sans text-lg text-center">
              No favorite colors yet! Start adding color you love.
            </p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
