import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination as PaginationEl,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';

type SkeletonPaginationProps = {
  pageCount?: number;
};

export function SkeletonPagination({
  pageCount = 6,
}: SkeletonPaginationProps): React.ReactElement {
  return (
    <PaginationEl className="my-3">
      <PaginationContent>
        <PaginationItem>
          <Skeleton className="h-9 w-24 rounded-md" />
        </PaginationItem>

        {[...Array(pageCount)].map((_, index) => {
          return (
            <PaginationItem key={index}>
              <Skeleton className="h-9 w-9 rounded-md" />
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <Skeleton className="h-9 w-24 rounded-md" />
        </PaginationItem>
      </PaginationContent>
    </PaginationEl>
  );
}
