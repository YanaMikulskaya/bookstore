import { useLocation } from 'react-router';
import { Island } from '@/components/Island';
import { Message } from '@/components/Message';

export function RegistrationConfirmation(): React.ReactElement {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <Island title="Подтверждение регистрации" page="Подтверждение регистрации">
      <Message
        text1="Пожалуйста, активируйте свой аккаунт, ссылка активации отправлена электронным письмом на адрес "
        text2="Пожалуйста, проверьте свою электронную почту."
        email={email}
        button="Ввести ссылку"
      />
    </Island>
  );
}
