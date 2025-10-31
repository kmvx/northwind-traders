import { PhoneIcon, PrinterIcon } from 'lucide-react';

import CopyButton from '../../ui/CopyButton';

export default function ContactPhone({
  phone,
  description,
  isFax = false,
}: {
  phone: string;
  description?: string;
  isFax?: boolean;
}) {
  return (
    <div className="flex items-center gap-2" title={isFax ? 'Fax' : 'Phone'}>
      {isFax ? (
        <PrinterIcon className="min-w-4 size-4 text-muted-foreground" />
      ) : (
        <PhoneIcon className="min-w-4 size-4 text-muted-foreground" />
      )}
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
}
