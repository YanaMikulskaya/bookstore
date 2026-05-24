import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { clearErrors, registration } from '@/redux/auth-slice';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminPassword?: string;
};

export function FormRegister() {
  const { user, errorMessage, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      adminPassword: '',
    },
  });

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const passwordValue = watch('password');
  const emailValue = watch('email');
  const nameValue = watch('name');

  useEffect(() => {
    if (errorMessage) {
      dispatch(clearErrors());
    }
  }, [emailValue, passwordValue, nameValue, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/auth/registration-confirmation', {
        state: { email: user.email },
      });
      reset();
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const requestData = {
      name: data.name,
      email: data.email,
      password: data.password,
      adminSecret: isAdmin ? data.adminPassword : undefined,
    };

    dispatch(registration(requestData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="mb-1" htmlFor="name">
          Имя
        </Label>
        <Input
          id="name"
          placeholder="Введите ваше имя"
          {...register('name', {
            required: 'Имя обязательно',
            minLength: {
              value: 2,
              message: 'Имя должно содержать минимум 2 символа',
            },
          })}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-1" htmlFor="email">
          Электронная почта
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@mail.com"
          {...register('email', {
            required: 'Почта обязательна',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Введите корректный email',
            },
          })}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-1" htmlFor="password">
          Пароль
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Введите пароль"
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          })}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-destructive text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-1" htmlFor="confirmPassword">
          Подтвердите пароль
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) =>
              value === passwordValue || 'Пароли не совпадают',
          })}
          className={errors.confirmPassword ? 'border-destructive' : ''}
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-xs mt-1">
            {errors.confirmPassword.message}
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
            type="password"
            placeholder="Введите пароль администратора"
            {...register('adminPassword', {
              validate: (value) =>
                !isAdmin || (value && value.length > 0)
                  ? true
                  : 'Введите пароль администратора',
            })}
          />
          {errors.adminPassword && (
            <p className="text-destructive text-xs mt-1">
              {errors.adminPassword.message}
            </p>
          )}
        </div>
      )}

      {/* Ошибка от сервера */}
      {errorMessage && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Уже есть аккаунт? </span>
        <Link to="/auth/login" className="text-primary hover:underline">
          Войти
        </Link>
      </div>
    </form>
  );
}
