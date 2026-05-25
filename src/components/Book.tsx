//import { useEffect, useState } from 'react';
import { Title } from '@/components/Title';
import type { BookModel } from '@/types';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import { ImageBasic } from '@/components/basicComponents/ImageBasic';
import { TableBasic } from '@/components/basicComponents/TableBasic';
import { BreadcrumbBasic } from '@/components/basicComponents/BreadcrumbBasic';
import { BookActions } from '@/components/BookActions';
import { SkeletonBook } from './SkeletonBook';
import { CarouselGenre } from './CaroselGenre';

type BookProps = {
  book: BookModel | null;
  error?: boolean;
  loading?: boolean;
};

export function Book({ book, error, loading }: BookProps): React.ReactElement {
  if (!book || error) {
    return (
      <>
        <BreadcrumbBasic />
        <AlertBasic
          title="К сожалению, такая книга не обнаружена."
          text="Возможно, её удалили или вы перешли по неверной ссылке. Проверьте
        правильность ссылки или вернитесь на главную."
        />
      </>
    );
  }
  if (loading) {
    return (
      <>
        <BreadcrumbBasic />
        <SkeletonBook />
      </>
    );
  }
  const { id, title, author, year, genre, price, coverUrl, longDescription } =
    book;

  return (
    <>
      <BreadcrumbBasic page={genre} />
      <Title>{title}</Title>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-10 mb-3">
        <ImageBasic
          src={`http://localhost:3001${coverUrl}`}
          alt={title}
          width="300px"
          ratio={10 / 16}
          className="shrink-0"
        />
        <div>
          <div className="flex flex-col-reverse  md:flex-row gap-3 mb-3 justify-between">
            <TableBasic
              price={price}
              author={author}
              year={year}
              genre={genre}
              className="w-3xs"
            />
            <BookActions forLarge id={id} />
          </div>
          <p className="text-justify">{longDescription}</p>
        </div>
      </div>
      <CarouselGenre genre={genre}></CarouselGenre>
    </>
  );
}
