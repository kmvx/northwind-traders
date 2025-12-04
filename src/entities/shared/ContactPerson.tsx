import { UserIcon } from 'lucide-react';
import React from 'react';

interface ContactPersonProps {
  name: string;
  contactTitle: string;
  title?: string;
}

const ContactPerson: React.FC<ContactPersonProps> = ({
  name,
  contactTitle,
  title,
}) => {
  return (
    <div className="flex items-start gap-2" title={title}>
      <UserIcon className="text-muted-foreground mt-1 size-4" />
      <div className="flex flex-col">
        <b>{name}</b>
        <span className="text-muted-foreground text-sm">{contactTitle}</span>
      </div>
    </div>
  );
};

export default ContactPerson;
