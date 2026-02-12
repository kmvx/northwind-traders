import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useQueryTopEmployeesBySales } from '@/net';
import { ErrorMessage, WaitSpinner } from '@/ui';
import { formatCurrency, getEmployeeNameByData } from '@/utils';

const TopEmployeesBySales: React.FC = () => {
  const {
    data: dataEmployees,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQueryTopEmployeesBySales();

  return (
    <Card className="rounded-md shadow-none transition hover:shadow-lg">
      <CardHeader>
        <CardTitle>Top employees by sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorMessage error={error} retry={refetch} isFetching={isFetching} />
        {!dataEmployees && isLoading && <WaitSpinner />}
        <ul className="flex flex-col gap-2">
          {dataEmployees?.map((employee, index) => (
            <li
              key={employee.employeeId}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  #{index + 1}
                </span>
                <Link
                  href={`/employees/${employee.employeeId}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <Image
                    src={`/assets/img/database/${employee.firstName.toLowerCase()}.jpg`}
                    alt=""
                    title="Employee photo"
                    className="h-[40px] w-[40px] rounded-md object-cover"
                    width="40"
                    height="40"
                    priority={index === 0}
                  />
                  {getEmployeeNameByData(employee)}
                </Link>
              </div>
              <div className="flex flex-col items-end text-sm">
                <span className="font-bold">
                  {formatCurrency(employee.totalSales)}
                </span>
                <span className="text-muted-foreground">
                  {employee.totalOrders}{' '}
                  {employee.totalOrders === 1 ? 'order' : 'orders'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopEmployeesBySales;
