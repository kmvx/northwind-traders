'use client';

import { MapPinIcon, PhoneIcon } from 'lucide-react';
import React from 'react';

import { Separator } from '@/components/ui';
import {
  useQueryOrder,
  useQueryOrderCustomer,
  useQueryOrderEmployee,
  useQueryOrderShipper,
} from '@/net';
import {
  CopyButton,
  ErrorMessage,
  Flag,
  PanelCentred,
  PropertyGrid,
  Typography,
  WaitSpinner,
} from '@/ui';
import { formatDateFromString, joinFields, setDocumentTitle } from '@/utils';

import { CustomerHoverCard } from '../customers';
import { EmployeeHoverCard } from '../employees';

interface OrderProps {
  id: string;
}

const Order: React.FC<OrderProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQueryOrder({ id });
  const { data: dataCustomer } = useQueryOrderCustomer({ id });
  const { data: dataEmployee } = useQueryOrderEmployee({ id });
  const { data: dataShipper } = useQueryOrderShipper({ id });

  setDocumentTitle(`Order${data ? ' #' + data.orderId : ''}`);

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const items = [
    ...(dataCustomer
      ? [
          {
            name: 'Customer',
            value: (
              <span className="inline-flex items-center gap-2">
                <CustomerHoverCard customerId={dataCustomer.customerId}>
                  <b>{dataCustomer.companyName}</b> ({dataCustomer.customerId})
                </CustomerHoverCard>
                <Flag country={dataCustomer.country} />
              </span>
            ),
            description: 'The customer who placed the order.',
          },
        ]
      : []),
    ...(dataEmployee
      ? [
          {
            name: 'Employee',
            value: (
              <span className="inline-flex items-center gap-2">
                <EmployeeHoverCard
                  employee={dataEmployee}
                  employeeId={dataEmployee.employeeId}
                />
                <Flag country={dataEmployee.country} />
              </span>
            ),
            description: 'The employee who processed the order.',
          },
        ]
      : []),
    {
      name: 'Order date',
      value: formatDateFromString(data.orderDate),
      description: 'The date when the order was placed by the customer.',
    },
    {
      name: 'Shipped date',
      value: formatDateFromString(data.shippedDate),
      description: 'The date when the order was shipped to the customer.',
    },
    {
      name: 'Required date',
      value: formatDateFromString(data.requiredDate),
      description:
        'The date by which the customer requests the order to be delivered.',
    },
    {
      name: 'Freight',
      value: '$' + data.freight,
      description: 'The cost of shipping the order to the customer.',
    },
    {
      name: 'Ship name',
      value: data.shipName,
      description:
        'The name of the recipient or entity to whom the order is shipped.',
    },
    {
      name: 'Ship address',
      value: (
        <div className="inline-flex items-center gap-2">
          <MapPinIcon className="size-4 text-muted-foreground" />
          <Flag country={data.shipCountry} />
          <b className="my-2">
            {joinFields(
              data.shipCountry,
              data.shipRegion,
              data.shipCity,
              data.shipAddress,
              data.shipPostalCode,
            )}
          </b>
        </div>
      ),
      description: 'Street address for delivery of the order.',
    },
  ];

  const itemsShipper = dataShipper
    ? [
        {
          name: 'Ship company name',
          value: dataShipper.companyName,
          description: 'Name of the shipping company or provider.',
        },
        {
          name: 'Ship company phone',
          value: (
            <div className="inline-flex items-center gap-2 my-2">
              <PhoneIcon className="size-4 text-muted-foreground" />
              <span className="flex items-center gap-2">
                <b>{dataShipper.phone}</b>
                <CopyButton content={dataShipper.phone} />
              </span>
            </div>
          ),
          description: 'Contact phone number for the shipping company.',
        },
      ]
    : [];

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>Order #{data.orderId}</Typography.Header1>
      <PropertyGrid items={items} />
      {dataShipper && (
        <>
          <Separator />
          <Typography.Header2>Shipper</Typography.Header2>
          <PropertyGrid items={itemsShipper} />
        </>
      )}
    </PanelCentred>
  );
};

export default Order;
