import { BookModel } from './data';
import { GenreBadge } from './GenreBadge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { ImageBasic } from './basicComponents/ImageBasic';
import { BookActions } from './BookActions';
import { Link } from 'react-router';

type BookCardProps = {
  data: BookModel;
  variant?: 'compact' | 'horizontal' | 'modal' | 'cart';
};

export function BookCard({
  data,
  variant = 'compact',
}: BookCardProps): React.ReactElement {
  const {
    id,
    title,
    author,
    year,
    genre,
    price,
    cover_url,
    short_description,
  } = data;
  if (!data) {
    return <></>;
  }
  const imageUrl = `http://localhost:3001${cover_url}`;

  const isHorizontal =
    variant === 'horizontal' || variant === 'modal' || variant === 'cart';
  const isModal = variant === 'modal';
  const isCart = variant === 'cart';

  const imageWidth = isModal ? '200px' : isHorizontal ? '120px' : undefined;
  const cardClassName = isHorizontal
    ? 'flex sm:flex-row relative items-center mx-auto w-full p-0 gap-0'
    : 'flex relative mx-auto w-full max-w-sm pt-0';

  if (variant === 'compact') {
    return (
      <Card className={cardClassName} id={String(id)}>
        <GenreBadge className="absolute top-3 left-3 z-30" genre={genre} />
        <ImageBasic
          src={imageUrl}
          alt={title}
          className="relative"
          ratio={10 / 16}
        />
        <CardHeader>
          <div className="text-sm font-bold text-primary">{price} руб.</div>
          <CardTitle className="text-sm">
            <Link to={`/books/${id}`}>{title}</Link>
          </CardTitle>
          <CardDescription className="text-[10px]">
            {author}, {year}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <BookActions forSmall id={id} />
        </CardFooter>
      </Card>
    );
  }

  // Горизонтальная версия (поиск и модальная)
  return (
    <Card className={cardClassName} id={String(id)}>
      <GenreBadge className="absolute top-3 left-3 z-30" genre={genre} />
      <ImageBasic
        src={imageUrl}
        alt={title}
        className="relative shrink-0"
        width={imageWidth}
        ratio={10 / 16}
      />
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="font-bold text-primary">{price} руб.</div>

        <CardTitle className={isModal ? 'text-lg' : 'text-sm'}>
          {title}
        </CardTitle>

        <CardDescription className={isModal ? '' : 'text-[10px]'}>
          {author}, {year}
        </CardDescription>

        {short_description && (
          <CardContent className="p-0">
            <p>{short_description}</p>
          </CardContent>
        )}
        {!isCart && <BookActions id={id} />}
      </div>
    </Card>
  );
}
