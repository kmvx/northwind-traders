import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  type ICategories,
  type ICustomer,
  type ICustomers,
  type IEmployee,
  type IEmployees,
  type IOrder,
  type IOrderDetails,
  type IOrders,
  type IProduct,
  type IProducts,
  type IRegions,
  type IShipper,
  type IShippers,
  type ISupplier,
  type ISuppliers,
  type ITerritories,
} from './models';
import { dateFromString } from './utils';

const API_URL = 'https://demodata.grapecity.com/northwind/api/v1';

// Customers

export const useQueryCustomers = () => {
  return useQuery<ICustomers>({
    queryKey: [API_URL + '/Customers'],
  });
};

export const getCustomers = async (): Promise<ICustomers> => {
  return await (await fetch(API_URL + '/Customers')).json();
};

export const useQueryCustomer = ({
  customerId,
  enabled = true,
}: {
  customerId: string | undefined;
  enabled?: boolean;
}) => {
  return useQuery<ICustomer>({
    queryKey: [API_URL + '/Customers/' + customerId],
    enabled,
  });
};

export const useQueryOrderCustomer = ({
  orderId,
}: {
  orderId: number | undefined;
}) => {
  return useQuery<ICustomer>({
    queryKey: [API_URL + '/Orders/' + orderId + '/Customer'],
  });
};

// Employees

export const useQueryEmployees = () => {
  return useQuery<IEmployees>({
    queryKey: [API_URL + '/Employees'],
  });
};

export const getEmployees = async (): Promise<IEmployees> => {
  return await (await fetch(API_URL + '/Employees')).json();
};

export const useQueryEmployee = ({
  employeeId,
  enabled = true,
}: {
  employeeId: number | undefined;
  enabled?: boolean;
}) => {
  return useQuery<IEmployee>({
    queryKey: [API_URL + '/Employees/' + employeeId],
    enabled,
  });
};

export const getEmployee = async (
  employeeId: number | undefined,
): Promise<IEmployee> => {
  return await (await fetch(API_URL + '/Employees/' + employeeId)).json();
};

export const useQueryOrderEmployee = ({
  orderId,
}: {
  orderId: number | undefined;
}) => {
  return useQuery<IEmployee>({
    queryKey: [API_URL + '/Orders/' + orderId + '/Employee'],
  });
};

export const useEmployeeTeritories = ({
  employeeId,
}: {
  employeeId: number | undefined;
}) => {
  return useQuery<ITerritories>({
    queryKey: [API_URL + '/Employees/' + employeeId + '/Territories'],
  });
};

export const useQueryRegions = () => {
  return useQuery<IRegions>({
    queryKey: [API_URL + '/Regions'],
  });
};

// Orders

export const useQueryOrders = ({
  customerId,
  employeeId,
  shipperId,
}: {
  customerId?: string | undefined;
  employeeId?: number | undefined;
  shipperId?: number | undefined;
} = {}) => {
  return useQuery<IOrders>({
    queryKey: [
      API_URL +
        (customerId ? '/Customers/' : '') +
        (employeeId ? '/Employees/' : '') +
        (shipperId ? '/Shippers/' : '') +
        (customerId ?? employeeId ?? shipperId ?? '') +
        '/Orders',
    ],
  });
};

export const useQueryOrdersFiltered = ({
  filterYear,
  setYearsSet,
}: {
  filterYear?: number | null;
  setYearsSet: (yearsSet: Set<number>) => void;
}): UseQueryResult<IOrders> => {
  const queryResult = useQuery<IOrders>({
    queryKey: [API_URL + '/Orders'],
  });

  const { data } = queryResult;

  const preparedData = useMemo(() => {
    const yearsSet = new Set<number>();

    const result = data?.map((item) => {
      const orderDateObject = dateFromString(item.orderDate);
      yearsSet.add(orderDateObject.getFullYear());
      return {
        ...item,
        orderDateObject,
      };
    });

    setYearsSet(yearsSet);
    return result;
  }, [data, setYearsSet]);

  const filteredData = useMemo(() => {
    if (!preparedData) return preparedData;

    let filteredData = preparedData;

    if (filterYear != null) {
      filteredData = filteredData.filter(
        (item) => item.orderDateObject.getFullYear() === filterYear,
      );
    }

    return filteredData;
  }, [preparedData, filterYear]);

  if (!filteredData || !queryResult.data) {
    return queryResult;
  }

  return { ...queryResult, data: filteredData };
};

export const useQueryOrder = ({ orderId }: { orderId: number | undefined }) => {
  return useQuery<IOrder>({
    queryKey: [API_URL + '/Orders/' + orderId],
  });
};

export const useQueryOrderDetails = ({
  orderId,
  productId,
}: {
  orderId?: number | undefined;
  productId?: number | undefined;
}) => {
  return useQuery<IOrderDetails>({
    queryKey: [
      API_URL +
        (orderId ? '/Orders/' : '') +
        (productId ? '/Products/' : '') +
        (orderId ?? productId ?? '') +
        '/OrderDetails',
    ],
  });
};

// Products

export const useQueryProducts = ({
  supplierId,
  orderId,
  enabled = true,
}: {
  supplierId?: number | undefined;
  orderId?: number | undefined;
  enabled?: boolean;
}) => {
  return useQuery<IProducts>({
    queryKey: [
      API_URL +
        (supplierId ? '/Suppliers/' + supplierId : '') +
        (orderId ? '/Orders/' + orderId : '') +
        '/Products',
    ],
    enabled,
  });
};

export const useQueryProduct = ({
  productId,
}: {
  productId: number | undefined;
}) => {
  return useQuery<IProduct>({
    queryKey: [API_URL + '/Products/' + productId],
  });
};

export const useQueryCategories = () => {
  return useQuery<ICategories>({
    queryKey: [API_URL + '/Categories'],
  });
};

// Shippers

export const useQueryShippers = () => {
  return useQuery<IShippers>({
    queryKey: [API_URL + '/Shippers'],
  });
};

export const useQueryOrderShipper = ({
  orderId,
}: {
  orderId: number | undefined;
}) => {
  return useQuery<IShipper>({
    queryKey: [API_URL + '/Orders/' + orderId + '/Shipper'],
  });
};

// Suppliers

export const useQuerySuppliers = () => {
  return useQuery<ISuppliers>({
    queryKey: [API_URL + '/Suppliers'],
  });
};

export const useQuerySupplier = ({
  supplierId,
  enabled = true,
}: {
  supplierId: number | undefined;
  enabled?: boolean;
}) => {
  return useQuery<ISupplier>({
    queryKey: [API_URL + '/Suppliers/' + supplierId],
    enabled,
  });
};
