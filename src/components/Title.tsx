import React from 'react';

type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps): React.ReactElement {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight text-balance mb-6">
      {children}
    </h1>
  );
}
