import React from 'react';
import { Separator } from '@/components/ui/separator';

export function Footer(): React.ReactElement {
  return (
    <div className="mt-auto">
      <Separator />
      <footer className="p-6">
        <>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">©2026 BookStore</div>
            <div className="text-sm text-muted-foreground">
              All rights reserved
            </div>
          </div>
        </>
      </footer>
    </div>
  );
}
