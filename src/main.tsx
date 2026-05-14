import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/app.css';

const appElement: HTMLElement | null = document.querySelector('#app');

if (!appElement) {
  throw new Error('App element not found');
}

createRoot(appElement).render(<App />);
