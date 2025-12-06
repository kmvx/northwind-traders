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
      <div className="u-hue-blue mt-1 rounded-md p-2">
        <UserIcon className="size-4" />
      </div>
      <div className="flex flex-col">
        <b>{name}</b>
        <span className="text-muted-foreground text-sm">{contactTitle}</span>
      </div>
    </div>
  );
};

export default ContactPerson;
