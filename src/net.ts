import { useQuery } from '@tanstack/react-query';

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

const API_URL = 'https://demodata.grapecity.com/northwind/api/v1';

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

// Customers

export const useQueryCustomers = () => {
  return useQuery<ICustomers>({
    queryKey: [API_URL + '/Customers'],
  });
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
