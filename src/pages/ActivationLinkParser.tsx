import { Island } from '@/components/Island';
import { FormActivationLink } from '@/components/FormActivationLink';

export function ActivationLinkParser(): React.ReactElement {
  return (
    <Island title="Введите ссылку" page="Активация">
      <FormActivationLink />
    </Island>
  );
}
