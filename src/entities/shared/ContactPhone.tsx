import { PhoneIcon, PhoneOutgoingIcon, PrinterIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui';
import type { PhoneType } from '@/types';

import CopyButton from '../../ui/CopyButton';

interface ContactPhoneProps {
  phone: PhoneType | null;
  description?: string;
  isFax?: boolean;
}

const ContactPhone: React.FC<ContactPhoneProps> = ({
  phone,
  description,
  isFax = false,
}) => {
  if (!phone) return null;

  const IconComponent = isFax ? PrinterIcon : PhoneIcon;

  return (
    <div className="flex items-center gap-2">
      <div className="u-hue-orange rounded-md p-2">
        <IconComponent className="size-4 min-w-4" />
      </div>
      <span className="flex items-center gap-2">
        <b title={isFax ? 'Fax' : 'Phone'}>{phone}</b>
        {!isFax && (
          <Button
            title="Call phone"
            variant="outline"
            size="icon"
            className="-my-2"
          >
            <a href={'tel:' + phone}>
              <PhoneOutgoingIcon className="size-4" />
            </a>
          </Button>
        )}
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
