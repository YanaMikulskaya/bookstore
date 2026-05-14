import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FieldError = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  adminPassword?: string;
};

export function FormRegister() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newErrors: FieldError = {};

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const adminPassword = formData.get('adminPassword') as string;

    if (!name) newErrors.name = 'Имя обязательно';
    if (!email) newErrors.email = 'Почта обязательна';
    if (!password) newErrors.password = 'Пароль обязателен';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Пароли не совпадают';
    if (isAdmin && !adminPassword)
      newErrors.adminPassword = 'Введите пароль администратора';

    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="mb-1" htmlFor="name">
          Имя
        </Label>
        <Input id="name" name="name" placeholder="Введите ваше имя" />
        {errors.name && (
          <p className="text-destructive text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label className="mb-1" htmlFor="email">
          Электронная почта
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label className="mb-1" htmlFor="password">
          Пароль
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
        />
        {errors.password && (
          <p className="text-destructive text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <Label className="mb-1" htmlFor="confirmPassword">
          Подтвердите пароль
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-xs mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div>
          <Label htmlFor="adminMode" className="cursor-pointer">
            Права администратора
          </Label>
          <p className="text-xs text-muted-foreground">
            Включите, если вы администратор
          </p>
        </div>
        <Switch id="adminMode" checked={isAdmin} onCheckedChange={setIsAdmin} />
      </div>

      {isAdmin && (
        <div>
          <Label className="mb-1" htmlFor="adminPassword">
            Пароль администратора
          </Label>
          <Input
            id="adminPassword"
            name="adminPassword"
            type="password"
            placeholder="Введите пароль администратора"
          />
          {errors.adminPassword && (
            <p className="text-destructive text-xs mt-1">
              {errors.adminPassword}
            </p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full">
        Зарегистрироваться
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Уже есть аккаунт? </span>
        <a href="/login" className="text-primary hover:underline">
          Войти
        </a>
      </div>
    </form>
  );
}
