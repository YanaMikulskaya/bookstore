import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps): React.ReactElement {
  return <main className="my-10">{children}</main>;
}
