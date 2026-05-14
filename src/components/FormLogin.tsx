import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FieldError = {
  email?: string;
  password?: string;
};

export function FormLogin() {
  const [errors, setErrors] = useState<FieldError>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newErrors: FieldError = {};

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) newErrors.email = 'Почта обязательна';
    if (!password) newErrors.password = 'Пароль обязателен';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Отправить форму
      console.log('Вход:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Почта */}
      <div>
        <Label className="mb-1" htmlFor="email">
          Электронная почта
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@mail.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Пароль */}
      <div>
        <Label className="mb-1" htmlFor="password">
          Пароль
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-destructive text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* Кнопка входа */}
      <Button type="submit" className="w-full">
        Войти
      </Button>

      {/* Ссылка на регистрацию */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Нет аккаунта? </span>
        <a
          href="/register"
          className="text-primary hover:underline font-medium"
        >
          Зарегистрироваться
        </a>
      </div>
    </form>
  );
}
