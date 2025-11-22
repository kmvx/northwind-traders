'use client';

import { useCallback, useMemo, useState } from 'react';
import invariant from 'tiny-invariant';

import { FilterYear } from '@/entities/orders';
import { useNavigate } from '@/hooks';
import { useQueryEmployees, useQueryOrdersFiltered } from '@/net';
import { getEmployeeNameByData } from '@/utils';

import { BarChart } from '.';

const EmployeesBarChart: React.FC = () => {
  // State
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [yearsSet, setYearsSet] = useState<Set<number>>(new Set());

  // Network data
  const {
    filteredData: dataOrders,
    queryResult: {
      error: errorOrders,
      isLoading: isLoadingOrders,
      refetch: refetchOrders,
    },
  } = useQueryOrdersFiltered({ filterYear, setYearsSet });
  const {
    data: dataEmployees,
    error: errorEmployees,
    isLoading: isLoadingEmployees,
    refetch: refetchEmployees,
  } = useQueryEmployees();

  const error = errorOrders ?? errorEmployees;
  const isLoading = isLoadingOrders || isLoadingEmployees;

  const refetch = useCallback(() => {
    refetchOrders();
    refetchEmployees();
  }, [refetchOrders, refetchEmployees]);

  // Prepare data
  const { categoriesQueryResult, mapEmployeeToId } = useMemo(() => {
    let categories;
    const mapEmployeeToId = new Map<string, number>();
    if (dataOrders && dataEmployees) {
      const mapIdToEmployee = new Map<number, string>();
      dataEmployees.forEach((employee) => {
        const name = getEmployeeNameByData(employee);
        mapIdToEmployee.set(employee.employeeId, name);
        mapEmployeeToId.set(name, employee.employeeId);
      });

      categories = dataOrders.map(
        (item) => mapIdToEmployee.get(item.employeeId) ?? '',
      );
    }

    return {
      categoriesQueryResult: {
        categories,
        error,
        isLoading,
        refetch,
      },
      mapEmployeeToId,
    };
  }, [dataOrders, dataEmployees, error, isLoading, refetch]);

  // Navigation
  const queries = useMemo(
    () => ({
      year: filterYear ? String(filterYear) : '',
    }),
    [filterYear],
  );
  const categoryConverter = useCallback(
    (category: string) => {
      invariant(mapEmployeeToId);
      const employeeId = mapEmployeeToId.get(category);
      invariant(employeeId != undefined && employeeId > 0);
      return String(employeeId);
    },
    [mapEmployeeToId],
  );
  const navigate = useNavigate({
    name: 'employees',
    categoryConverter,
    queries,
  });

  const hue = 216;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-2xl">
        Distribution of count of <b>orders</b> by <b>employees</b>
      </h3>
      <div className="flex justify-end">
        <FilterYear {...{ years: yearsSet, filterYear, setFilterYear }} />
      </div>
      <BarChart name="orders" {...{ categoriesQueryResult, hue, navigate }} />
    </div>
  );
};

export default EmployeesBarChart;
