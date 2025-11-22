'use client';

import React from 'react';

import { Separator } from '@/components/ui';
import {
  useQueryOrder,
  useQueryOrderCustomer,
  useQueryOrderEmployee,
  useQueryOrderShipper,
} from '@/net';
import {
  ErrorMessage,
  PanelCentred,
  PropertyGrid,
  Typography,
  WaitSpinner,
} from '@/ui';
import {
  formatCurrency,
  formatDateFromString,
  joinFields,
  setDocumentTitle,
} from '@/utils';

import { CustomerHoverCard } from '../customers';
import { EmployeeHoverCard } from '../employees';
import { ContactAddress, ContactPhone, Flag } from '../shared';
import { OrderDetails } from '.';

interface OrderProps {
  orderId: number;
}

const Order: React.FC<OrderProps> = ({ orderId }) => {
  const { data, error, isLoading, refetch } = useQueryOrder({
    orderId,
  });
  const { data: dataCustomer } = useQueryOrderCustomer({ orderId });
  const { data: dataEmployee } = useQueryOrderEmployee({ orderId });
  const { data: dataShipper } = useQueryOrderShipper({ orderId });

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
      value: formatCurrency(data.freight),
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
        <ContactAddress
          country={data.shipCountry}
          address={joinFields(
            data.shipCountry,
            data.shipRegion,
            data.shipCity,
            data.shipPostalCode,
            data.shipAddress,
          )}
        />
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
          value: <ContactPhone phone={dataShipper.phone} />,
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
      <OrderDetails orderId={orderId} />
    </PanelCentred>
  );
};

export default Order;
