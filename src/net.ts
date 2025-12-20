import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import invariant from 'tiny-invariant';

import {
  getCategories,
  getCustomer,
  getCustomerByOrderId,
  getCustomers,
  getEmployee,
  getEmployeeByOrderId,
  getEmployees,
  getEmployeeTerritories,
  getOrder,
  getOrderDetails,
  getOrders,
  getProduct,
  getProducts,
  getProductsByOrderId,
  getRegions,
  getShipperByOrderId,
  getShippers,
  getSupplier,
  getSuppliers,
} from './db/actions';
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

// Customers

export const useQueryCustomers = ({
  initialData,
}: {
  initialData?: ICustomers | undefined;
} = {}) => {
  return useQuery<ICustomers>({
    queryKey: ['northwind.customers'],
    queryFn: getCustomers,
    ...(initialData ? { initialData } : {}),
  });
};

export const useQueryCustomer = ({
  customerId,
  enabled = true,
}: {
  customerId: string | null;
  enabled?: boolean;
}) => {
  return useQuery<ICustomer | undefined>({
    queryKey: ['northwind.customers', { customerId }],
    queryFn: async () => await getCustomer({ customerId }),
    enabled,
  });
};

export const useQueryCustomerByOrderId = ({ orderId }: { orderId: number }) => {
  return useQuery<ICustomer>({
    queryKey: ['northwind.customers', { orderId }],
    queryFn: () => getCustomerByOrderId({ orderId }),
  });
};

// Employees

export const useQueryEmployees = ({
  enabled = true,
  initialData,
}: {
  enabled?: boolean;
  initialData?: IEmployees | undefined;
} = {}) => {
  return useQuery<IEmployees>({
    queryKey: ['northwind.employees'],
    queryFn: getEmployees,
    enabled,
    ...(initialData ? { initialData } : {}),
  });
};

export const useQueryEmployee = ({
  employeeId,
  enabled = true,
  initialData,
}: {
  employeeId: number | null;
  enabled?: boolean;
  initialData?: IEmployee | undefined;
}) => {
  return useQuery<IEmployee | undefined>({
    queryKey: ['northwind.employees', { employeeId }],
    queryFn: () => getEmployee({ employeeId }),
    enabled,
    ...(initialData ? { initialData } : {}),
  });
};

export const useQueryEmployeeByOrderId = ({ orderId }: { orderId: number }) => {
  return useQuery<IEmployee>({
    queryKey: ['northwind.employees', { orderId }],
    queryFn: () => getEmployeeByOrderId({ orderId }),
  });
};

export const useEmployeeTerritories = ({
  employeeId,
}: {
  employeeId: number | null;
}) => {
  return useQuery<ITerritories | undefined>({
    queryKey: ['northwind.territories', { employeeId }],
    queryFn: () => getEmployeeTerritories({ employeeId }),
  });
};

export const useQueryRegions = () => {
  return useQuery<IRegions>({
    queryKey: ['northwind.regions'],
    queryFn: getRegions,
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
  invariant(
    (customerId ? 1 : 0) + (employeeId ? 1 : 0) + (shipperId ? 1 : 0) <= 1,
  );

  return useQuery<IOrders>({
    queryKey: ['northwind.orders', { customerId, employeeId, shipperId }],
    queryFn: () => getOrders({ customerId, employeeId, shipperId }),
    ...(initialData ? { initialData } : {}),
  });
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
  const queryResult = useQueryOrders();
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

export const useQueryOrder = ({
  orderId,
  enabled = true,
}: {
  orderId: number;
  enabled?: boolean;
}) => {
  return useQuery<IOrder>({
    queryKey: ['northwind.orders', { orderId }],
    queryFn: () => getOrder({ orderId }),
    enabled,
  });
};

export const useQueryOrderDetails = ({
  orderId,
  productId,
}: {
  orderId?: number | undefined;
  productId?: number | undefined;
}) => {
  invariant((orderId ? 1 : 0) + (productId ? 1 : 0) === 1);
  return useQuery<IOrderDetails>({
    queryKey: ['northwind.orderDetails', { orderId, productId }],
    queryFn: () => getOrderDetails({ orderId, productId }),
  });
};

// Products

export const useQueryProducts = ({
  supplierId,
  enabled = true,
  initialData,
}: {
  supplierId?: number | undefined;
  enabled?: boolean;
  initialData?: IProducts | undefined;
} = {}) => {
  return useQuery<IProducts>({
    queryKey: ['northwind.products', { supplierId }],
    queryFn: () => getProducts({ supplierId }),
    enabled,
    ...(initialData ? { initialData } : {}),
  });
};

export const useQueryProductsByOrderId = ({
  orderId,
  enabled = true,
}: {
  orderId?: number | undefined;
  enabled?: boolean;
} = {}) => {
  return useQuery<IProducts>({
    queryKey: ['northwind.products', { orderId }],
    queryFn: () => getProductsByOrderId({ orderId }),
    enabled,
  });
};

export const useQueryProduct = ({ productId }: { productId: number }) => {
  return useQuery<IProduct | undefined>({
    queryKey: ['northwind.products', { productId }],
    queryFn: () => getProduct({ productId }),
  });
};

export const useQueryCategories = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}) => {
  return useQuery<ICategories>({
    queryKey: ['northwind.categories'],
    queryFn: getCategories,
    enabled,
  });
};

// Shippers

export const useQueryShippers = () => {
  return useQuery<IShippers>({
    queryKey: ['northwind.shippers'],
    queryFn: getShippers,
  });
};

export const useQueryShipperByOrderId = ({ orderId }: { orderId: number }) => {
  return useQuery<IShipper>({
    queryKey: ['northwind.shippers', { orderId }],
    queryFn: () => getShipperByOrderId({ orderId }),
  });
};

// Suppliers

export const useQuerySuppliers = ({
  enabled = true,
  initialData,
}: {
  enabled?: boolean;
  initialData?: ISuppliers | undefined;
} = {}) => {
  return useQuery<ISuppliers>({
    queryKey: ['northwind.suppliers'],
    queryFn: getSuppliers,
    enabled,
    ...(initialData ? { initialData } : {}),
  });
};

export const useQuerySupplier = ({
  supplierId,
  enabled = true,
}: {
  supplierId: number;
  enabled?: boolean;
}) => {
  return useQuery<ISupplier>({
    queryKey: ['northwind.suppliers', { supplierId }],
    queryFn: () => getSupplier({ supplierId }),
    enabled,
  });
};
