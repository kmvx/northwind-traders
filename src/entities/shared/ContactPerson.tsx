import { UserIcon } from 'lucide-react';

export default function ContactPerson({
  name,
  contactTitle,
  title,
}: {
  name: string;
  contactTitle: string;
  title?: string;
}) {
  return (
    <div className="flex items-start gap-2" title={title}>
      <UserIcon className="size-4 text-muted-foreground mt-1" />
      <div className="flex flex-col">
        <b>{name}</b>
        <span className="text-sm text-muted-foreground">{contactTitle}</span>
      </div>
    </div>
  );
}
