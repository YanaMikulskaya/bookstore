//import { useEffect, useState } from 'react';
import { Title } from '@/components/Title';
import type { BookModel } from '@/types';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import { ImageBasic } from '@/components/basicComponents/ImageBasic';
import { TableBasic } from '@/components/basicComponents/TableBasic';
import { BreadcrumbBasic } from '@/components/basicComponents/BreadcrumbBasic';
import { BookActions } from '@/components/BookActions';

type BookProps = {
  book: BookModel | null;
};

export function Book({ book }: BookProps): React.ReactElement {
  if (!book) {
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
  const { id, title, author, year, genre, price, cover_url, long_description } =
    book;

  return (
    <>
      <BreadcrumbBasic page={genre} />
      <Title>{title}</Title>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-10 mb-3">
        <ImageBasic
          src={`http://localhost:3001${cover_url}`}
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
            <BookActions forLarge />
          </div>
          <p className="text-justify">{long_description}</p>
        </div>
      </div>
    </>
  );
}
