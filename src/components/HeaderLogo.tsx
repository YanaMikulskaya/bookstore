import { BookHeartIcon } from 'lucide-react';
import { Link } from 'react-router';

export function HeaderLogo(): React.ReactElement {
  return (
    <div className="flex gap-1 items-center">
      <BookHeartIcon className="text-primary" />
      <Link
        className="text-2xl font-semibold tracking-tight no-underline transition-colors hover:text-primary"
        to="/books/all/1"
      >
        BOOKSTORE
      </Link>
    </div>
  );
}
