import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback } from './ui/avatar';

export function UserPick(): React.ReactElement {
  const userInitials = 'ЯМ';
  const userName = 'Яна Микульская';
  const userRole = 'Администратор';
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[70px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar size="lg">
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-medium">{userName}</p>
        <p className="text-xs text-muted-foreground">{userRole}</p>
      </div>
    </div>
  );
}
