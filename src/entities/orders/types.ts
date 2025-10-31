import type { IOrder } from '@/models';

export interface IOrderFormatted extends IOrder {
  employeeName: string;
  orderDateFormatted: string;
  shippedDateFormatted: string;
  requiredDateFormatted: string;
  orderDateObject: Date;
  shippedDateObject: Date;
  requiredDateObject: Date;
  addressLine: string;
}
