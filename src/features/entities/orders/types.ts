import type { IOrder } from '@/models';

export interface IOrderCustom extends IOrder {
  employeeName: string;
  orderDateObject: Date;
  shippedDateObject: Date;
  requiredDateObject: Date;
  addressLine: string;
}
