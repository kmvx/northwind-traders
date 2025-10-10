import { useQuery } from '@tanstack/react-query';

import {
  type IEmployee,
  type IEmployees,
  type IRegions,
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
