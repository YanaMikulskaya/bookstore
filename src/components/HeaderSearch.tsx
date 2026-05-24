import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';

export function HeaderSearch(): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/books/search')) {
      setSearchValue('');
    }
  }, [location.pathname]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
  }

  function handleFormSubmit(event?: React.FormEvent<HTMLFormElement>): void {
    if (event) {
      event.preventDefault();
    }

    if (searchValue.trim()) {
      navigate(`/books/search/${encodeURIComponent(searchValue.trim())}`);
    }
  }

  return (
    <form role="search" onSubmit={handleFormSubmit}>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="Поиск..."
          value={searchValue}
          onChange={handleInputChange}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
