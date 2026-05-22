import { Title } from './Title';
import { HeartIcon } from 'lucide-react';
import { TabsBasic } from './basicComponents/TabsBasic';
import { useLocation } from 'react-router';

export function SectionHeader(): React.ReactElement {
  const location = useLocation();

  // Определяем активный
  const getActiveTab = () => {
    if (location.pathname.includes('/favorites')) {
      return 'favorites';
    }
    return 'books';
  };

  return (
    <>
      <Title>Каталог книг</Title>
      <TabsBasic
        value={getActiveTab()}
        tabs={[
          { value: 'books', label: 'Все книги', to: '/books/all/1' },
          {
            value: 'favorites',
            label: 'Избранное',
            to: '/books/favorites/1',
            icon: <HeartIcon />,
          },
        ]}
        className="mb-6"
      />
    </>
  );
}
