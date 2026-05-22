import { router } from './router';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { store } from './redux/store';

export function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}
