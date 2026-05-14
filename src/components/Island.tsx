import { Title } from './Title';
import { BreadcrumbBasic } from '../components/basicComponents/BreadcrumbBasic';

type IslandProps = {
  page: string;
  title: string;
  children: React.ReactNode;
};

export function Island({ title, page, children }: IslandProps) {
  return (
    <>
      <BreadcrumbBasic page={page} />
      <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <Title>{title}</Title>
        </div>
        {children}
      </div>
    </>
  );
}
