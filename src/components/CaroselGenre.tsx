import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BookCard } from './BookCard';
import type { BooksState } from '@/types';
import { SkeletonBookCard } from './SkeletonBookCard';
import { AlertBasic } from './basicComponents/AlertBasic';
import { fetchBooks } from '@/redux/books-slice';

export function CarouselGenre({
  genre,
}: {
  genre: string;
}): React.ReactElement {
  const { data, error, loading } = useAppSelector(
    (state): BooksState => state.books,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks({ limit: 50, offset: 0, genre }));
  }, [dispatch, genre]);

  if (error) {
    return <AlertBasic title="Не удалось загрузить" />;
  }

  return (
    <>
      {' '}
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-4">
        {data.length === 0
          ? `Не найдены книги в жанре '${genre}'`
          : `Книги в жанре '${genre}'`}
      </h3>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/6 pl-1">
                <div className="p-2">
                  <SkeletonBookCard />
                </div>
              </CarouselItem>
            ))}
          {data &&
            data.map((book) => (
              <CarouselItem key={book.id} className="basis-1/6 pl-1">
                <div className="p-2">
                  <BookCard variant="compact" key={book.id} data={book} />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
