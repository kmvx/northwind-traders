import type { IOrderDetail } from '@/models';
import { asCurrencyType } from '@/types';

export function getTotalCost(item: IOrderDetail) {
  return asCurrencyType(item.unitPrice * item.quantity * (1 - item.discount));
}
