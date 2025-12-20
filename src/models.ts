import type {
  CountryType,
  CurrencyType,
  DateStringType,
  PhoneType,
} from './types';

interface IAddress {
  address: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: CountryType | null;
}

export interface ICategory {
  categoryId: number;
  categoryName: string;
  description: string | null;
}
export type ICategories = ICategory[];

export interface ICustomer extends IAddress {
  customerId: string;
  companyName: string;
  contactName: string | null;
  contactTitle: string | null;
  fax: PhoneType | null;
  phone: PhoneType | null;
}
export type ICustomers = ICustomer[];

export interface IEmployee extends IAddress {
  employeeId: number;
  lastName: string;
  firstName: string;
  title: string | null;
  titleOfCourtesy: string | null;
  birthDate: DateStringType | null;
  homePhone: PhoneType | null;
  notes: string | null;
  // photo: string | null;
  reportsTo: number | null;
  photoPath: string | null;
}
export type IEmployees = IEmployee[];

export interface IOrder {
  orderId: number;
  customerId: string | null;
  employeeId: number | null;
  freight: CurrencyType | null;
  orderDate: DateStringType | null;
  requiredDate: DateStringType | null;
  shipName: string | null;
  shipCountry: CountryType | null;
  shipRegion: string | null;
  shipCity: string | null;
  shipPostalCode: string | null;
  shipAddress: string | null;
  shipVia: number | null;
  shippedDate: DateStringType | null;
}
export type IOrders = IOrder[];

export interface IOrderDetail {
  discount: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: CurrencyType;
}
export type IOrderDetails = IOrderDetail[];

export interface IProduct {
  productId: number;
  productName: string;
  supplierId: number | null;
  categoryId: number | null;
  quantityPerUnit: string | null;
  unitPrice: CurrencyType | null;
  unitsInStock: number | null;
  unitsOnOrder: number | null;
  reorderLevel: number | null;
  discontinued: boolean;
}
export type IProducts = IProduct[];

export interface IShipper {
  companyName: string;
  shipperId: number;
  phone: PhoneType | null;
}
export type IShippers = IShipper[];

export interface ISupplier extends IAddress {
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  phone: PhoneType | null;
  supplierId: number | null;
}
export type ISuppliers = ISupplier[];

export interface ITerritory {
  territoryId: string;
  territoryDescription: string;
  regionId: number;
}
export type ITerritories = ITerritory[];

export interface IRegion {
  regionId: number;
  regionDescription: string;
}
export type IRegions = IRegion[];
