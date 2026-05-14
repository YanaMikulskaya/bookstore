import { AspectRatio } from '@/components/ui/aspect-ratio';
import book from '@/assets/book.png';

type ImageBasicProps = {
  src?: string;
  alt: string;
  ratio?: number;
  width?: string;
  className?: string;
};

export function ImageBasic({
  src = book,
  alt,
  ratio = 2 / 3,
  width = '300px',
  className = '',
}: ImageBasicProps) {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{ maxWidth: width }}
    >
      <AspectRatio ratio={ratio} className="bg-muted">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
