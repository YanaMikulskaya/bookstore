import { Layout } from './components/Layout';
import { Activation } from './pages/Activation';
import { ActivationLinkParser } from './pages/ActivationLinkParser';
import { BookPage } from './pages/BookPage';
import { BookCatalog } from './pages/BooksCatalog';
import { BookFavorites } from './pages/BooksFavorites';
import { CartPage } from './pages/CartPage';
import { Login } from './pages/Login';
import { RegistrationConfirmation } from './pages/RegistrationConfirmation';
import { Registration } from './pages/Registration';
import { Search } from './pages/Search';

export function App() {
  return (
    <>
      <Layout>
        {/*<Activation />*/}
        {<ActivationLinkParser />}
        {/*<BookPage />*/}
        {/*<BookCatalog />*/}
        {/*<BookFavorites />*/}
        {/*<CartPage />*/}
        {/*<Login />*/}
        {/*<RegistrationConfirmation />*/}
        {/*<Registration />*/}
        {/*<Search />*/}
      </Layout>
    </>
  );
}
