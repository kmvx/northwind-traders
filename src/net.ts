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

async function fetchJSON(path: string) {
  const url = API_URL + path;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data from url: ' + url);
  }
  return res.json();
}

// Customers

export const useQueryCustomers = () => {
  return useQuery<ICustomers>({
    queryKey: [API_URL + '/Customers'],
  });
};

export const getCustomers = async (): Promise<ICustomers> => {
  return await fetchJSON('/Customers');
};

export const useQueryCustomer = ({
  customerId,
  enabled = true,
}: {
  customerId: string;
  enabled?: boolean;
}) => {
  return useQuery<ICustomer>({
    queryKey: [API_URL + '/Customers/' + customerId],
    enabled,
  });
};

export const useQueryOrderCustomer = ({ orderId }: { orderId: number }) => {
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
  return await fetchJSON('/Employees');
};

export const useQueryEmployee = ({
  employeeId,
  enabled = true,
}: {
  employeeId: number;
  enabled?: boolean;
}) => {
  return useQuery<IEmployee>({
    queryKey: [API_URL + '/Employees/' + employeeId],
    enabled,
  });
};

export const getEmployee = async (employeeId: number): Promise<IEmployee> => {
  return await fetchJSON('/Employees/' + employeeId);
};

export const useQueryOrderEmployee = ({ orderId }: { orderId: number }) => {
  return useQuery<IEmployee>({
    queryKey: [API_URL + '/Orders/' + orderId + '/Employee'],
  });
};

export const useEmployeeTeritories = ({
  employeeId,
}: {
  employeeId: number;
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
  initialData,
}: {
  customerId?: string | undefined;
  employeeId?: number | undefined;
  shipperId?: number | undefined;
  initialData?: IOrders | undefined;
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
    ...(initialData ? { initialData } : {}),
  });
};

export const getOrders = async (): Promise<IOrders> => {
  return await fetchJSON('/Orders');
};

export const useQueryOrdersFiltered = ({
  filterYear,
  setYearsSet,
}: {
  filterYear?: number | null;
  setYearsSet: (yearsSet: Set<number>) => void;
}): {
  queryResult: Omit<UseQueryResult<IOrders>, 'data'>;
  filteredData: IOrders | undefined;
} => {
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

  return { queryResult, filteredData };
};

export const useQueryOrder = ({ orderId }: { orderId: number }) => {
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

export const getProducts = async (): Promise<IProducts> => {
  return await fetchJSON('/Products');
};

export const useQueryProduct = ({ productId }: { productId: number }) => {
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

export const useQueryOrderShipper = ({ orderId }: { orderId: number }) => {
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

export const getSuppliers = async (): Promise<ISuppliers> => {
  return await fetchJSON('/Suppliers');
};

export const useQuerySupplier = ({
  supplierId,
  enabled = true,
}: {
  supplierId: number;
  enabled?: boolean;
}) => {
  return useQuery<ISupplier>({
    queryKey: [API_URL + '/Suppliers/' + supplierId],
    enabled,
  });
};
