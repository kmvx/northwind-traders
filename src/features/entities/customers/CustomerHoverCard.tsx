'use client';

import {
  HashIcon,
  MapPinIcon,
  PhoneIcon,
  PrinterIcon,
  UserIcon,
} from 'lucide-react';
import { memo, useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useQueryCustomer } from '@/net';
import { BasicLink, CopyButton, ErrorMessage, Flag, WaitSpinner } from '@/ui';
import { joinFields } from '@/utils';

type CustomerHoverCardProps = {
  customerId: string;
  children?: React.ReactNode;
};

function CustomerHoverCard({ customerId, children }: CustomerHoverCardProps) {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useQueryCustomer({
    id: customerId,
    enabled: open,
  });

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2" title="Address">
          <MapPinIcon className="size-4 text-muted-foreground" />
          <Flag country={data.country} />
          <b className="my-2">
            {joinFields(
              data.country,
              data.region,
              data.city,
              data.address,
              data.postalCode,
            )}
          </b>
        </div>

        <div className="flex items-center gap-2" title="Phone">
          <PhoneIcon className="size-4 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <b>{data.phone}</b>
            <CopyButton content={data.phone} />
          </span>
        </div>

        <div className="flex items-center gap-2" title="Fax">
          <PrinterIcon className="size-4 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <b>{data.fax}</b>
          </span>
        </div>

        <div className="flex items-center gap-2" title="ID">
          <HashIcon className="size-4 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <b>{data.customerId}</b>
          </span>
        </div>

        <div className="flex items-start gap-2" title="Contact">
          <UserIcon className="size-4 text-muted-foreground mt-1" />
          <div className="flex flex-col">
            <b>{data.contactName}</b>
            <span>{data.contactTitle}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <BasicLink href={`/customers/${customerId}`}>
          {children ? children : customerId}
        </BasicLink>
      </HoverCardTrigger>
      <HoverCardContent>{getContent()}</HoverCardContent>
    </HoverCard>
  );
}

export default memo(CustomerHoverCard);
