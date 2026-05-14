import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { SearchIcon } from 'lucide-react';

export function HeaderSearch(): React.ReactElement {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Поиск..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
