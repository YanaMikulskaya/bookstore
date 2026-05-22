import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

export function ThemeToggle(): React.ReactElement {
  const [theme, setTheme] = useState<Theme>(() => {
    // Проверяем сохраненную тему в localStorage
    const saved = localStorage.getItem('theme') as Theme;
    // Проверяем системные настройки
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    return saved || system;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Переключить тему"
    >
      {theme === 'light' ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
}
