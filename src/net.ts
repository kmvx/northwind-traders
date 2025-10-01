import { useQuery } from '@tanstack/react-query';

import { IEmployees } from './models';

const API_URL = 'https://demodata.grapecity.com/northwind/api/v1';

// Employees

export const useQueryEmployees = () => {
  return useQuery<IEmployees>({
    queryKey: [API_URL + '/Employees'],
  });
};
