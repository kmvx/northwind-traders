import type { IOrderDetail } from '@/models';

export function getTotalCost(item: IOrderDetail) {
  return item.unitPrice * item.quantity * (1 - item.discount);
}
