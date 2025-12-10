import { PhoneIcon, PrinterIcon } from 'lucide-react';
import React from 'react';

import type { PhoneType } from '@/types';

import CopyButton from '../../ui/CopyButton';

interface ContactPhoneProps {
  phone: PhoneType;
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
      <div className="u-hue-orange rounded-md p-2">
        <IconComponent className="size-4 min-w-4" />
      </div>
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
