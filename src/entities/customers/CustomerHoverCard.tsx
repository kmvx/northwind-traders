'use client';

import { HashIcon } from 'lucide-react';
import { memo, useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useQueryCustomer } from '@/net';
import { BasicLink, ErrorMessage, Typography, WaitSpinner } from '@/ui';

import { ContactAddress, ContactPerson, ContactPhone } from '../shared';

type CustomerHoverCardProps = {
  customerId: string | null;
  children?: React.ReactNode;
};

const CustomerHoverCard: React.FC<CustomerHoverCardProps> = ({
  customerId,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useQueryCustomer({
    customerId,
    enabled: open,
  });

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;

    return (
      <div className="flex flex-col gap-2">
        <Typography.Header3>{data.companyName}</Typography.Header3>
        <div className="text-center">Customer company</div>
        <ContactAddress address={data} />

        <ContactPhone phone={data.phone} />
        <ContactPhone phone={data.fax} isFax />

        <div className="flex items-center gap-2" title="ID">
          <div className="u-hue-violet rounded-md p-2">
            <HashIcon className="size-4" />
          </div>
          <span className="flex items-center gap-2">
            <b>{data.customerId}</b>
          </span>
        </div>

        <ContactPerson
          name={data.contactName}
          contactTitle={data.contactTitle}
          title="Contact name and title"
        />
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
      <HoverCardContent className="text-sm">{getContent()}</HoverCardContent>
    </HoverCard>
  );
};

export default memo(CustomerHoverCard);
