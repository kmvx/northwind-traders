import type { IOrderDetail } from '@/models';
import { castToCurrency } from '@/types';

export function getTotalCost(item: IOrderDetail) {
  return castToCurrency(item.unitPrice * item.quantity * (1 - item.discount));
}
