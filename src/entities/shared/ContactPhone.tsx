import { PhoneIcon, PrinterIcon } from 'lucide-react';
import React from 'react';

import CopyButton from '../../ui/CopyButton';

interface ContactPhoneProps {
  phone: string;
  description?: string;
  isFax?: boolean;
}

const ContactPhone: React.FC<ContactPhoneProps> = ({
  phone,
  description,
  isFax = false,
}) => {
  const IconComponent = isFax ? PrinterIcon : PhoneIcon;

  return (
    <div className="flex items-center gap-2" title={isFax ? 'Fax' : 'Phone'}>
      <IconComponent className="text-muted-foreground size-4 min-w-4" />
      <span className="flex items-center gap-2">
        <b>{phone}</b>
        <CopyButton content={phone} />
        {description && (
          <span className="text-muted-foreground text-sm whitespace-pre">
            {description}
          </span>
        )}
      </span>
    </div>
  );
};

export default ContactPhone;
