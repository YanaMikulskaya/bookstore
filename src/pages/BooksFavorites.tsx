//import { useEffect, useState } from 'react';
import { BookGrid } from '@/components/BookGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { Pagination } from '@/components/Pagination';
import { data } from '@/components/data';

export function BookFavorites(): React.ReactElement {
  const booksData = data;

  return (
    <>
      <SectionHeader />
      <Pagination favorites />
      <BookGrid books={booksData} />
      <Pagination favorites />
    </>
  );
}
