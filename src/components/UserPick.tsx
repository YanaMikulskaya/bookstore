import { Avatar, AvatarFallback } from './ui/avatar';

type UserPickProps = {
  name: string;
  role: string;
};

export function UserPick({ name, role }: UserPickProps): React.ReactElement {
  const getUserInitials = (name: string): string => {
    if (!name) return '';

    const words = name.split(' ');
    if (words.length > 1) {
      return words
        .map((word) => word[0])
        .join('')
        .toUpperCase();
    }

    const matches = name.match(/[A-ZА-Я]/g);
    return matches
      ? matches.join('').toUpperCase()
      : name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar size="lg">
        <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">
          {role === 'admin' ? 'Администратор' : 'Пользователь'}
        </p>
      </div>
    </div>
  );
}
