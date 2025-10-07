import { useQuery } from '@tanstack/react-query';

import { type IEmployees } from './models';

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
