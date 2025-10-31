'use client';

import React from 'react';

import { useQuerySupplier } from '@/net';
import {
  ErrorMessage,
  PanelCentred,
  PropertyGrid,
  Typography,
  WaitSpinner,
} from '@/ui';
import { joinFields, setDocumentTitle } from '@/utils';

import { ContactAddress, ContactPerson, ContactPhone } from '../shared';

interface SupplierProps {
  id: string;
}

const Supplier: React.FC<SupplierProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQuerySupplier({ id });

  setDocumentTitle(data?.companyName, 'Supplier');

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
            data.address,
            data.postalCode,
          )}
        />
      ),
      description: 'Supplier business street address.',
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
        'The name and job title of the primary contact person for the supplier.',
    },
    {
      name: 'Phone',
      value: <ContactPhone phone={data.phone} />,
      description: 'The supplier contact phone number.',
    },
  ];

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{data.companyName}</Typography.Header1>
      <div className="flex flex-col gap-4">
        <div className="text-center">Supplier company</div>
        <PropertyGrid items={items} />
      </div>
    </PanelCentred>
  );
};

export default Supplier;
