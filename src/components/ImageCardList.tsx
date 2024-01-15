import ImageCard from './ImageCard';

import { useImages } from '@/store/image';

export default function ImageCardList() {
  const images = useImages();

  return (
    <section className="flex flex-wrap justify-center items-center gap-4">
      {images !== null && images.length >= 1
        ? images.map((image) => <ImageCard key={image.id} image={image} />)
        : null}
    </section>
  );
}
