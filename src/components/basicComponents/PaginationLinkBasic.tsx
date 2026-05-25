import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<typeof NavLink>;

export function PaginationLinkBasic({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      className={cn(className)}
    >
      <NavLink
        aria-current={isActive ? 'page' : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  );
}

export function PaginationPreviousBasic({
  className,
  text = '',
  ...props
}: React.ComponentProps<typeof PaginationLinkBasic> & { text?: string }) {
  return (
    <PaginationLinkBasic
      aria-label="Go to previous page"
      size="default"
      className={cn('pl-1.5!', className)}
      {...props}
    >
      <RiArrowLeftSLine data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLinkBasic>
  );
}

export function PaginationNextBasic({
  className,
  text = '',
  ...props
}: React.ComponentProps<typeof PaginationLinkBasic> & { text?: string }) {
  return (
    <PaginationLinkBasic
      aria-label="Go to next page"
      size="default"
      className={cn('pr-1.5!', className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <RiArrowRightSLine data-icon="inline-end" />
    </PaginationLinkBasic>
  );
}
