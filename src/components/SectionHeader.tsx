import { Title } from './Title';
import { HeartIcon } from 'lucide-react';
import { TabsBasic } from './basicComponents/TabsBasic';

export function SectionHeader(): React.ReactElement {
  return (
    <>
      <Title>Каталог книг</Title>
      <TabsBasic
        defaultValue="Все книги"
        tabs={[
          { value: 'books', label: 'Все книги' },
          { value: 'favorites', label: 'Избранное', icon: <HeartIcon /> },
        ]}
        className="mb-6"
        onValueChange={(value) => console.log('Tab changed:', value)}
      />
    </>
  );
}
