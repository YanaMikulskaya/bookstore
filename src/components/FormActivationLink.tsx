import { Input } from '@/components/ui/input';

export function FormActivationLink() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const link = formData.get('link');
    console.log(link);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="link" name="link" placeholder="Ссылка активации" />
    </form>
  );
}
