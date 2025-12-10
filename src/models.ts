import type {
  CountryType,
  CurrencyType,
  DateStringType,
  PhoneType,
} from './types';

interface IAddress {
  country: CountryType;
  region: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface ICategory {
  categoryId: number;
  categoryName: string;
  description: string;
}
export type ICategories = ICategory[];

export interface ICustomer extends IAddress {
  companyName: string;
  contactName: string;
  contactTitle: string;
  customerId: string;
  fax: PhoneType | null;
  phone: PhoneType;
}
export type ICustomers = ICustomer[];

export interface IEmployee extends IAddress {
  birthDate: DateStringType;
  employeeId: number;
  firstName: string;
  homePhone: PhoneType;
  lastName: string;
  notes: string;
  reportsTo: number | null;
  title: string;
  titleOfCourtesy: string;
  photo: string;
  photoPath: string;
}
export type IEmployees = IEmployee[];

export interface IOrder {
  orderId: number;
  customerId: string;
  employeeId: number;
  freight: CurrencyType;
  orderDate: DateStringType;
  requiredDate: DateStringType;
  shipName: string;
  shipCountry: CountryType;
  shipRegion: string;
  shipCity: string;
  shipPostalCode: string;
  shipAddress: string;
  shipVia: number;
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
  categoryId: number;
  discontinued: boolean;
  productName: string;
  quantityPerUnit: string;
  supplierId: number;
  reorderLevel: number;
  unitPrice: CurrencyType;
  unitsInStock: number;
  unitsOnOrder: number;
}
export type IProducts = IProduct[];

export interface IShipper {
  companyName: string;
  phone: PhoneType;
  shipperId: number;
}
export type IShippers = IShipper[];

export interface ISupplier extends IAddress {
  companyName: string;
  contactName: string;
  contactTitle: string;
  phone: PhoneType;
  supplierId: number;
}
export type ISuppliers = ISupplier[];

export interface ITerritory {
  territoryId: number;
  territoryDescription: string;
  regionId: number;
}
export type ITerritories = ITerritory[];

export interface IRegion {
  regionId: number;
  regionDescription: string;
}
export type IRegions = IRegion[];
