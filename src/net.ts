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
  employeeId?: string | undefined;
  shipperId?: string | undefined;
} = {}) => {
  return useQuery<IOrders>({
    queryKey: [
      API_URL +
        (customerId != undefined
          ? '/Customers/'
          : employeeId != undefined
            ? '/Employees/'
            : shipperId != undefined
              ? '/Shippers/'
              : '') +
        (customerId ?? employeeId ?? shipperId ?? '') +
        '/Orders',
    ],
  });
};

export const useQueryOrder = ({ id }: { id: string | undefined }) => {
  return useQuery<IOrder>({
    queryKey: [API_URL + '/Orders/' + id],
  });
};

export const useQueryOrderDetails = ({
  orderId,
  productId,
}: {
  orderId?: string | undefined;
  productId?: string | undefined;
}) => {
  return useQuery<IOrderDetails>({
    queryKey: [
      API_URL +
        (orderId != undefined ? '/Orders/' : '') +
        (productId != undefined ? '/Products/' : '') +
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
  id,
  enabled = true,
}: {
  id: string | number | undefined;
  enabled?: boolean;
}) => {
  return useQuery<IEmployee>({
    queryKey: [API_URL + '/Employees/' + id],
    enabled,
  });
};

export const useQueryOrderEmployee = ({ id }: { id: string | undefined }) => {
  return useQuery<IEmployee>({
    queryKey: [API_URL + '/Orders/' + id + '/Employee'],
  });
};

export const useEmployeeTeritories = ({
  employeeId,
}: {
  employeeId: string | undefined;
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

export const useQueryOrderShipper = ({ id }: { id: string | undefined }) => {
  return useQuery<IShipper>({
    queryKey: [API_URL + '/Orders/' + id + '/Shipper'],
  });
};

// Suppliers

export const useQuerySuppliers = () => {
  return useQuery<ISuppliers>({
    queryKey: [API_URL + '/Suppliers'],
  });
};

export const useQuerySupplier = ({
  id,
  enabled = true,
}: {
  id: string | number | undefined;
  enabled?: boolean;
}) => {
  return useQuery<ISupplier>({
    queryKey: [API_URL + '/Suppliers/' + id],
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
  orderId?: string | undefined;
  enabled?: boolean;
}) => {
  return useQuery<IProducts>({
    queryKey: [
      API_URL +
        (supplierId != undefined ? '/Suppliers/' + supplierId : '') +
        (orderId != undefined ? '/Orders/' + orderId : '') +
        '/Products',
    ],
    enabled,
  });
};

export const useQueryProduct = ({ id }: { id: string | undefined }) => {
  return useQuery<IProduct>({
    queryKey: [API_URL + '/Products/' + id],
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
  id,
  enabled = true,
}: {
  id: string | undefined;
  enabled?: boolean;
}) => {
  return useQuery<ICustomer>({
    queryKey: [API_URL + '/Customers/' + id],
    enabled,
  });
};

export const useQueryOrderCustomer = ({ id }: { id: string | undefined }) => {
  return useQuery<ICustomer>({
    queryKey: [API_URL + '/Orders/' + id + '/Customer'],
  });
};
