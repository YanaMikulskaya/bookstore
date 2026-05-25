import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, Calendar, DollarSign, AlignLeft } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function SortSelect({
  value,
  onValueChange,
}: SortSelectProps): React.ReactElement {
  const sortOptions = [
    { value: 'id', label: 'По умолчанию', icon: ArrowUpDown },
    { value: 'title', label: 'По названию (А-Я)', icon: AlignLeft },
    { value: 'year', label: 'По году (старые → новые)', icon: Calendar },
    { value: '-year', label: 'По году (новые → старые)', icon: Calendar },
    { value: 'price', label: 'По цене (дешевые → дорогие)', icon: DollarSign },
    { value: '-price', label: 'По цене (дорогие → дешевые)', icon: DollarSign },
  ];

  return (
    <form>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[260px]">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </form>
  );
}
