'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';

import { useQueryEmployees, useQueryOrders } from '@/net';
import { getEmployeeNameByData } from '@/utils';

import { BarChart } from '.';

const EmployeesBarChart: React.FC = () => {
  const {
    data: dataOrders,
    error: errorOrders,
    isLoading: isLoadingOrders,
    refetch: refetchOrders,
  } = useQueryOrders();
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
  const router = useRouter();

  const navigate = useCallback(
    (category: string) => {
      invariant(mapEmployeeToId);
      const employeeId = mapEmployeeToId.get(category);
      invariant((employeeId ?? 0) > 0);
      router.push(`/employees/${employeeId}`);
    },
    [mapEmployeeToId, router],
  );

  const hue = 216;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-2xl">
        Distribution of count of <b>orders</b> by <b>employees</b>
      </h3>
      <BarChart name="orders" {...{ categoriesQueryResult, hue, navigate }} />
    </div>
  );
};

export default EmployeesBarChart;
