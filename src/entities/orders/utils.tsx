import type { IOrderDetail } from '@/models';

export function roundMoney(money: number) {
  return Math.round(money * 100) / 100;
}
export function getTotalCost(item: IOrderDetail) {
  return item.unitPrice * item.quantity * (1 - item.discount);
}
