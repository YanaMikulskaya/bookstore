import { BookHeartIcon } from 'lucide-react';

export function HeaderLogo(): React.ReactElement {
  return (
    <div className="flex gap-1 items-center">
      <BookHeartIcon className="text-primary" />
      <a
        className="text-2xl font-semibold tracking-tight no-underline transition-colors hover:text-primary"
        href="#"
      >
        BOOKSTORE
      </a>
    </div>
  );
}
