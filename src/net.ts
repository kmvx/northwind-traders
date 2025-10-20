import { useQuery } from '@tanstack/react-query';

import {
  type ICategories,
  type ICustomer,
  type ICustomers,
  type IEmployee,
  type IEmployees,
  type IProduct,
  type IProducts,
  type IRegions,
  type ISupplier,
  type ISuppliers,
  type ITerritories,
} from './models';

const API_URL = 'https://demodata.grapecity.com/northwind/api/v1';

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

export const useQueryProducts = () => {
  return useQuery<IProducts>({
    queryKey: [API_URL + '/Products'],
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

export const useQueryCustomer = ({ id }: { id: string | undefined }) => {
  return useQuery<ICustomer>({
    queryKey: [API_URL + '/Customers/' + id],
  });
};
