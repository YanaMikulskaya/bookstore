import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { BookModel } from '@/types';

import { GenreBadge } from '../GenreBadge';

type TableBasicProps = {
  author: BookModel['author'];
  year: BookModel['year'];
  genre: BookModel['genre'];
  price: BookModel['price'];
  className?: string;
};

export function TableBasic({
  author,
  year,
  genre,
  price,
  className,
}: TableBasicProps): React.ReactElement {
  return (
    <Table className={className}>
      <TableBody>
        <TableRow>
          <TableCell className="text-muted-foreground">Цена</TableCell>
          <TableCell className="text-lg font-bold text-primary text-right">
            {price}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">Автор</TableCell>
          <TableCell className="text-right">{author}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">Год</TableCell>
          <TableCell className="text-right">{year}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">Жанр</TableCell>
          <TableCell className="text-right">
            <GenreBadge genre={genre} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
