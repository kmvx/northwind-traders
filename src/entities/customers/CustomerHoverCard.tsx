'use client';

import { HashIcon } from 'lucide-react';
import { memo } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useQueryCustomerFromAll } from '@/net';
import type { CountryType, CustomerIdType } from '@/types';
import { BasicLink, ErrorMessage, Typography, WaitSpinner } from '@/ui';

import { ContactAddress, ContactPerson, ContactPhone, Flag } from '../shared';

interface CustomerHoverCardProps {
  customerId: CustomerIdType | null;
  country?: CountryType | undefined;
  children?: React.ReactNode;
}

const CustomerHoverCard: React.FC<CustomerHoverCardProps> = ({
  customerId,
  country = null,
  children,
}) => {
  const { data, error, isLoading, refetch } = useQueryCustomerFromAll({
    customerId,
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-2">
          {(data || country) && <Flag country={data?.country || country} />}
          <BasicLink href={`/customers/${customerId}`}>
            {children ? children : customerId}
          </BasicLink>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm">{getContent()}</HoverCardContent>
    </HoverCard>
  );
};

export default memo(CustomerHoverCard);
