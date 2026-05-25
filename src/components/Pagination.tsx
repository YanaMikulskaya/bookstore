import { useParams } from 'react-router';
import { useAppSelector } from '@/redux/store';
import {
  Pagination as PaginationEl,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  PaginationLinkBasic as PaginationLink,
  PaginationNextBasic as PaginationNext,
  PaginationPreviousBasic as PaginationPrevious,
} from './basicComponents/PaginationLinkBasic';
import { SkeletonPagination } from './SkeletonPagination';
import { buildPagination } from '@/utils/buildPagination';
import type { BooksState, FavoritesState } from '@/types';

export function Pagination({
  favorites = false,
}: {
  favorites?: boolean;
}): React.ReactElement | null {
  const { currentPage } = useParams();
  const pageNumber = Number(currentPage);
  const { data, totalPages, loading, error } = useAppSelector(
    (state): BooksState => state.books,
  );

  const { favoritesTotalPages, favoritesError, favoritesLoading } =
    useAppSelector((state): FavoritesState => state.favorites);

  const paginationTotalPages = favorites ? favoritesTotalPages : totalPages;
  const paginationLoading = favorites ? favoritesLoading : loading;
  const paginationError = favorites ? favoritesError : error;

  const nextPage = pageNumber + 1 > paginationTotalPages ? 1 : pageNumber + 1;
  const prevPage = pageNumber - 1 <= 0 ? paginationTotalPages : pageNumber - 1;
  const paginationNavigation = favorites ? '/books/favorites/' : '/books/all/';

  if (paginationLoading) {
    return <SkeletonPagination pageCount={totalPages} />;
  }
  if (paginationTotalPages <= 1 || paginationError || data.length === 0) {
    return null;
  }

  const paginationScheme = buildPagination(pageNumber, paginationTotalPages);

  return (
    <PaginationEl className="my-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={`${paginationNavigation}${prevPage}`} />
        </PaginationItem>

        {paginationScheme.map((page: number | string, index: number) => {
          if (page === '...') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink
                to={`${paginationNavigation}${page}`}
                isActive={page === pageNumber}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext to={`${paginationNavigation}${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </PaginationEl>
  );
}
