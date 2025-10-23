'use client';

import {
  HashIcon,
  MapPinIcon,
  PhoneIcon,
  PrinterIcon,
  UserIcon,
} from 'lucide-react';
import React from 'react';

import { useQueryCustomer } from '@/net';
import {
  CopyButton,
  ErrorMessage,
  Flag,
  PanelCentred,
  Typography,
  WaitSpinner,
} from '@/ui';
import { joinFields, setDocumentTitle } from '@/utils';

interface CustomerProps {
  id: string;
}

const Customer: React.FC<CustomerProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQueryCustomer({ id });

  setDocumentTitle(data?.companyName, 'Customer');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{data.companyName}</Typography.Header1>
      <div className="flex flex-col gap-4">
        <div className="text-center">Customer</div>

        <div className="flex flex-col md:flex-row flex-wrap gap-2 gap-x-4">
          <div>
            <div className="flex items-center gap-2" title="Address">
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

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 my-2" title="Phone">
                <PhoneIcon className="size-4 text-muted-foreground" />
                <span className="flex items-center gap-2">
                  <b>{data.phone}</b>
                  <CopyButton content={data.phone} />
                </span>
              </div>

              {data.fax && (
                <div className="flex items-center gap-2 my-2" title="Fax">
                  <PrinterIcon className="size-4 text-muted-foreground" />
                  <span className="flex items-center gap-2">
                    <b>{data.fax}</b>
                    <CopyButton content={data.fax} />
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 my-2" title="ID">
              <HashIcon className="size-4 text-muted-foreground" />
              <span className="flex items-center gap-2">
                <b>{data.customerId}</b>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 my-2" title="Contact">
                <UserIcon className="size-4 text-muted-foreground mt-1" />
                <div className="flex flex-col">
                  <b>{data.contactName}</b>
                  <span>{data.contactTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelCentred>
  );
};

export default Customer;
