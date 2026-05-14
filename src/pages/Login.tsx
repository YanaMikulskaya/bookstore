import { Island } from '@/components/Island';
import { FormLogin } from '@/components/FormLogin';

export function Login(): React.ReactElement {
  return (
    <Island title="Вход в аккаунт" page="Вход">
      <FormLogin />
    </Island>
  );
}
