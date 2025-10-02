'use client';

import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useQueryEmployees } from '@/net';
import { Flag } from '@/ui';
import { getEmployeeNameByData } from '@/utils';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function Employees() {
  const { data } = useQueryEmployees();

  if (!data) return;
  return (
    <div>
      <div className="m-2">{data.length} employees</div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] auto-rows-fr gap-4 max-[400px]:grid-cols-1 max-[400px]:auto-rows-auto">
        {data.map((item) => (
          <Link
            href={`/employees/${item.employeeId}`}
            key={item.employeeId}
            className="block"
          >
            <Card className="hover:shadow-lg transition h-full">
              <CardHeader>
                <CardTitle title="Employee name">
                  {getEmployeeNameByData(item)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Image
                  src={`/assets/img/database/${item.firstName.toLowerCase()}.jpg`}
                  alt=""
                  title="Employee photo"
                  className="w-[70px] h-[70px] object-cover rounded-md"
                  width="70"
                  height="70"
                />
                <div className="flex flex-col flex-1 justify-between">
                  <span
                    className="text-sm text-right font-medium"
                    title="Employee title"
                  >
                    {item.title}
                  </span>
                  <span
                    className="flex items-center justify-end gap-2 text-sm text-muted-foreground flex-wrap"
                    title="Employee location"
                  >
                    <MapPinIcon className="size-4" />
                    <span>
                      {item.country}, {item.city}
                    </span>
                    <Flag country={item.country} />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
