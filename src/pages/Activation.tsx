import { Island } from '@/components/Island';
import { Message } from '@/components/Message';

export function Activation(): React.ReactElement {
  return (
    <Island title="Успешная регистрация" page="Успешная регистрация">
      <Message
        text1="Адрес электронной почты подтвержден"
        text2="Ваша регистрация завершена."
        button="Вернуться на главную страницу"
      />
    </Island>
  );
}
