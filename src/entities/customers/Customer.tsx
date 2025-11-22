'use client';

import React from 'react';

import { useQueryCustomer } from '@/net';
import {
  ErrorMessage,
  PanelCentred,
  PropertyGrid,
  Typography,
  WaitSpinner,
} from '@/ui';
import { joinFields, setDocumentTitle } from '@/utils';

import { Orders } from '../orders';
import { ContactAddress, ContactPerson, ContactPhone } from '../shared';

interface CustomerProps {
  customerId: string;
}

const Customer: React.FC<CustomerProps> = ({ customerId }) => {
  const { data, error, isLoading, refetch } = useQueryCustomer({ customerId });

  setDocumentTitle(data?.companyName, 'Customer');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const items = [
    {
      name: 'Address',
      value: (
        <ContactAddress
          country={data.country}
          address={joinFields(
            data.country,
            data.region,
            data.city,
            data.postalCode,
          )}
          addressDetails={data.address}
        />
      ),
      description: 'Customer’s business street address.',
    },
    {
      name: 'Contact name and title',
      value: (
        <ContactPerson
          name={data.contactName}
          contactTitle={data.contactTitle}
        />
      ),
      description:
        'The name and job title of the primary contact person for the customer.',
    },
    {
      name: 'Phone',
      value: <ContactPhone phone={data.phone} />,
      description: 'The customer’s contact phone number.',
    },
    {
      name: 'Fax',
      value: data.fax ? <ContactPhone phone={data.fax} isFax /> : 'None',
      description: 'The customer’s fax number.',
    },
    {
      name: 'Customer ID',
      value: data.customerId,
      description: 'A unique identifier for each customer.',
    },
  ];

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{data.companyName}</Typography.Header1>
      <div className="flex flex-col gap-4">
        <div className="text-center">Customer company</div>
        <PropertyGrid items={items} />
      </div>
      <Orders customerId={customerId} />
    </PanelCentred>
  );
};

export default Customer;
