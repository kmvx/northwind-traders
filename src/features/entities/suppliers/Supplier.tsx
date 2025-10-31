'use client';

import React from 'react';

import { useQuerySupplier } from '@/net';
import {
  ContactAddress,
  ContactPerson,
  ContactPhone,
  ErrorMessage,
  PanelCentred,
  Typography,
  WaitSpinner,
} from '@/ui';
import { joinFields, setDocumentTitle } from '@/utils';

interface SupplierProps {
  id: string;
}

const Supplier: React.FC<SupplierProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQuerySupplier({ id });

  setDocumentTitle(data?.companyName, 'Supplier');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{data.companyName}</Typography.Header1>
      <div className="flex flex-col gap-4">
        <div className="text-center">Supplier company</div>

        <div className="flex flex-col md:flex-row flex-wrap gap-2 gap-x-4">
          <div className="flex flex-col gap-4">
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

            <ContactPhone phone={data.phone} />
          </div>

          <ContactPerson
            name={data.contactName}
            contactTitle={data.contactTitle}
          />
        </div>
      </div>
    </PanelCentred>
  );
};

export default Supplier;
