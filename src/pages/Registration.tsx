import { Island } from '@/components/Island';
import { FormRegister } from '@/components/FormRegister';

export function Registration(): React.ReactElement {
  return (
    <Island title="Регистрация" page="Регистрация">
      <FormRegister />
    </Island>
  );
}
