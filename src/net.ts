import { useQuery } from '@tanstack/react-query';

import {
  type IEmployee,
  type IEmployees,
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
