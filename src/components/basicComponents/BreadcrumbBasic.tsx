import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { Slot } from 'radix-ui';
import { Link } from 'react-router';

type BreadcrumbBasicProps = {
  page?: string;
};

function BreadcrumbLink({
  asChild,
  className,
  to,
  ...props
}: React.ComponentProps<typeof Link> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : Link;

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('transition-colors hover:text-foreground', className)}
      to={to}
      {...props}
    />
  );
}

export function BreadcrumbBasic({
  page,
}: BreadcrumbBasicProps): React.ReactElement {
  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/books/all/1">Домой</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
