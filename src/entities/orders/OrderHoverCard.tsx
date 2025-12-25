'use client';

import { memo, useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useQueryEmployees, useQueryOrder } from '@/net';
import {
  BasicLink,
  ErrorMessage,
  ResponsiveItems,
  Typography,
  WaitSpinner,
} from '@/ui';
import { formatCurrency, formatDateFromString } from '@/utils';

import { CustomerHoverCard } from '../customers';
import { EmployeeHoverCard } from '../employees';
import { ContactAddress } from '../shared';
import { useShipAddress } from '.';

interface OrderHoverCardProps {
  orderId: number;
}

const OrderHoverCard: React.FC<OrderHoverCardProps> = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useQueryOrder({
    orderId,
    enabled: open,
  });
  const { data: dataEmployees } = useQueryEmployees({
    enabled: open,
  });

  const address = useShipAddress(data);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;

    const employee = dataEmployees?.find(
      (value) => value.employeeId === data.employeeId,
    );

    const items = [
      {
        name: 'Customer',
        value: <CustomerHoverCard customerId={data.customerId} />,
      },
      {
        name: 'Employee',
        value: (
          <EmployeeHoverCard employee={employee} employeeId={data.employeeId} />
        ),
      },
      { name: 'Order date', value: formatDateFromString(data.orderDate) },
      { name: 'Shipped date', value: formatDateFromString(data.shippedDate) },
      { name: 'Required date', value: formatDateFromString(data.requiredDate) },
      { name: 'Freight', value: formatCurrency(data.freight) },
      undefined,
      { name: 'Ship name', value: data.shipName },
    ];

    return (
      <div className="flex flex-col gap-2">
        <Typography.Header3>Order #{orderId}</Typography.Header3>
        <ResponsiveItems items={items} />
        <ContactAddress
          address={address}
          title="Ship address"
          className="font-normal"
        />
      </div>
    );
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <BasicLink href={`/orders/${orderId}`}>#{orderId}</BasicLink>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm sm:w-100">
        {getContent()}
      </HoverCardContent>
    </HoverCard>
  );
};

export default memo(OrderHoverCard);
