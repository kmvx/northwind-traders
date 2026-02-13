import type { UseQueryResult } from '@tanstack/react-query';
import type React from 'react';
import invariant from 'tiny-invariant';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { CustomerHoverCard } from '@/entities/customers';
import { EmployeeHoverCard } from '@/entities/employees';
import { Flag } from '@/entities/shared';
import {
  useQueryTopCustomersBySales,
  useQueryTopEmployeesBySales,
  useQueryTopProductsBySales,
  useQueryTopSuppliersBySales,
} from '@/net';
import type { CurrencyType } from '@/types';
import { BasicLink, ErrorMessage, WaitSpinner } from '@/ui';
import { formatCurrency } from '@/utils';

interface TopEntitiesBySalesProps {
  name: string;
  queryResult: UseQueryResult;
  length: number;
  getEntityByIndex: (index: number) => {
    id: number | string;
    getComponent: () => React.ReactNode;
    totalSales: CurrencyType | undefined;
    totalOrders: number;
  };
}

const TopEntitiesBySales: React.FC<TopEntitiesBySalesProps> = ({
  name,
  queryResult,
  length,
  getEntityByIndex,
}) => {
  const { error, isLoading, isFetching, refetch } = queryResult;

  return (
    <Card className="rounded-md shadow-none transition hover:shadow-lg">
      <CardHeader>
        <CardTitle>Top {name} by sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorMessage error={error} retry={refetch} isFetching={isFetching} />
        {isLoading && <WaitSpinner />}
        <ul className="flex flex-col gap-2">
          {Array.from({ length }).map((_, index) => {
            const entity = getEntityByIndex(index);
            invariant(entity.totalSales);
            return (
              <li
                key={entity.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    #{index + 1}
                  </span>
                  {entity.getComponent()}
                </div>
                <div className="flex flex-col items-end text-sm">
                  <span className="font-bold">
                    {formatCurrency(entity.totalSales)}
                  </span>
                  <span className="text-muted-foreground">
                    {entity.totalOrders}{' '}
                    {entity.totalOrders === 1 ? 'order' : 'orders'}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export const TopEmployeesBySales: React.FC = () => {
  const queryResult = useQueryTopEmployeesBySales();

  return (
    <TopEntitiesBySales
      name="employees"
      queryResult={queryResult}
      length={queryResult.data?.length || 0}
      getEntityByIndex={(index) => {
        const data = queryResult.data;
        invariant(data);
        const entity = data[index];
        return {
          id: entity.employeeId,
          getComponent: () => (
            <EmployeeHoverCard
              employee={entity}
              employeeId={entity.employeeId}
            />
          ),
          totalSales: entity.totalSales,
          totalOrders: entity.totalOrders,
        };
      }}
    />
  );
};

export const TopCustomersBySales: React.FC = () => {
  const queryResult = useQueryTopCustomersBySales();

  return (
    <TopEntitiesBySales
      name="customers"
      queryResult={queryResult}
      length={queryResult.data?.length || 0}
      getEntityByIndex={(index) => {
        const data = queryResult.data;
        invariant(data);
        const entity = data[index];
        return {
          id: entity.customerId,
          getComponent: () => (
            <CustomerHoverCard customerId={entity.customerId}>
              {entity.companyName}
            </CustomerHoverCard>
          ),
          totalSales: entity.totalSales,
          totalOrders: entity.totalOrders,
        };
      }}
    />
  );
};

export const TopProducsBySales: React.FC = () => {
  const queryResult = useQueryTopProductsBySales();

  return (
    <TopEntitiesBySales
      name="products"
      queryResult={queryResult}
      length={queryResult.data?.length || 0}
      getEntityByIndex={(index) => {
        const data = queryResult.data;
        invariant(data);
        const entity = data[index];
        return {
          id: entity.productId,
          getComponent: () => (
            <span className="inline-flex items-center gap-2">
              <Flag country={entity.country} />
              <BasicLink
                href={`/products/${entity.productId}`}
                className="flex items-center gap-2 hover:underline"
              >
                {entity.productName}
              </BasicLink>
            </span>
          ),
          totalSales: entity.totalSales,
          totalOrders: entity.totalOrders,
        };
      }}
    />
  );
};

export const TopSuppliersBySales: React.FC = () => {
  const queryResult = useQueryTopSuppliersBySales();

  return (
    <TopEntitiesBySales
      name="suppliers"
      queryResult={queryResult}
      length={queryResult.data?.length || 0}
      getEntityByIndex={(index) => {
        const data = queryResult.data;
        invariant(data);
        const entity = data[index];
        return {
          id: entity.supplierId,
          getComponent: () => (
            <span className="inline-flex items-center gap-2">
              <Flag country={entity.country} />
              <BasicLink
                href={`/suppliers/${entity.supplierId}`}
                className="flex items-center gap-2 hover:underline"
              >
                {entity.companyName}
              </BasicLink>
            </span>
          ),
          totalSales: entity.totalSales,
          totalOrders: entity.totalOrders,
        };
      }}
    />
  );
};
