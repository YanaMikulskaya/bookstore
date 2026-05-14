import { Island } from '@/components/Island';
import { Message } from '@/components/Message';

export function RegistrationConfirmation(): React.ReactElement {
  return (
    <Island title="Подтверждение регистрации" page="Подтверждение регистрации">
      <Message
        text1="Пожалуйста, активируйте свой аккаунт, ссылка активации отправлена электронным письмом на адрес "
        text2="Пожалуйста, проверьте свою электронную почту."
        email="MMMM@djdlk.ru"
        button="Ввести ссылку"
      />
    </Island>
  );
}
