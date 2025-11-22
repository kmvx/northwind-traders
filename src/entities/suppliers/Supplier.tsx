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

import { Products } from '../products';
import { ContactAddress, ContactPerson, ContactPhone } from '../shared';

interface SupplierProps {
  supplierId: number;
  isEmbedded?: boolean;
}

const Supplier: React.FC<SupplierProps> = ({
  supplierId,
  isEmbedded = false,
}) => {
  const { data, error, isLoading, refetch } = useQuerySupplier({ supplierId });

  if (!isEmbedded) {
    setDocumentTitle(data?.companyName, 'Supplier');
  }

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

  const Header = isEmbedded ? Typography.Header2 : Typography.Header1;

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Header>{data.companyName}</Header>
      <div className="flex flex-col gap-4">
        <div className="text-center">Supplier company</div>
        <PropertyGrid items={items} />
      </div>
      <Products supplierId={data.supplierId} />
    </PanelCentred>
  );
};

export default Supplier;
