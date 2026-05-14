//import { useEffect, useState } from 'react';
import { BookGrid } from '@/components/BookGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { data } from '@/components/data';

export function BookCatalog(): React.ReactElement {
  const booksData = data;

  return (
    <>
      <SectionHeader />
      <BookGrid books={booksData} />
    </>
  );
}
