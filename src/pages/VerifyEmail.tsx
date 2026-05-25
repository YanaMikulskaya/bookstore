import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { activate } from '../redux/auth-slice';
import { Island } from '@/components/Island';
import { Message } from '@/components/Message';
import type { TokenModel, AuthState } from '../types';
import { initializeFavorites } from '@/redux/favorites-slice';

export function VerifyEmail(): React.ReactElement {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  console.log(token);
  const dispatch = useAppDispatch();
  const { isActivated, loading, errorMessage } = useAppSelector(
    (state): AuthState => state.auth,
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const data: TokenModel = {
      token,
    };

    dispatch(activate(data));
  }, [token, dispatch]);

  useEffect(() => {
    if (isActivated) {
      dispatch(initializeFavorites());
    }
  }, [isActivated]);

  return (
    <Island title="Активация" page="Активация">
      {loading && <Message text1="Завершение активации..." />}

      {isActivated && (
        <Message
          text1="Адрес электронной почты подтвержден"
          text2="Ваша регистрация завершена."
          button="Вернуться на главную страницу"
          link="/books/all/1"
        />
      )}
      {errorMessage && (
        <Message
          text1={errorMessage}
          text2="Проверте ссылку активации или повторите регистрацию"
          button="Зарегистрироваться"
          link="/auth/registration"
        />
      )}
    </Island>
  );
}
