import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { clearErrors, login } from '@/redux/auth-slice';
import { Link, useNavigate } from 'react-router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type LoginFormInputs = {
  email: string;
  password: string;
};

export function FormLogin() {
  const { user, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const emailValue = watch('email');
  const passwordValue = watch('password');

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/books/all/1');
      reset();
    }
  }, [user, navigate, reset]);

  useEffect(() => {
    if (errorMessage) {
      dispatch(clearErrors());
    }
  }, [emailValue, passwordValue, dispatch]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Почта */}
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
            {' '}
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Пароль */}
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
      {errorMessage && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm text-center">{errorMessage}</p>
        </div>
      )}
      {/* Кнопка входа */}
      <Button type="submit" className="w-full">
        Войти
      </Button>

      {/* Ссылка на регистрацию */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Нет аккаунта? </span>
        <Link
          to="/auth/registration"
          className="text-primary hover:underline font-medium"
        >
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
}
