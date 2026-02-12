'use server';

import { and, count, desc, eq, sql } from 'drizzle-orm';
import { uniqBy } from 'es-toolkit/array';

import type {
  ICategories,
  ICustomer,
  ICustomers,
  IEmployee,
  IEmployees,
  IOrder,
  IOrderDetails,
  IOrders,
  IProduct,
  IProducts,
  IRegions,
  IShipper,
  IShippers,
  ISupplier,
  ISuppliers,
  ITerritories,
} from '@/models';
import type { CurrencyType, CustomerIdType } from '@/types';

import db from '.';
import {
  customers,
  employees,
  employeeTerritories,
  orderDetails,
  orders,
  products,
  suppliers,
} from './schema';

function checkNotFoundAndReturn<T extends object>(
  item: T | null | undefined,
): T {
  if (!item) throw new Error('Item not found');
  return item;
}

export const getDBHealthStatus = async (): Promise<boolean> => {
  return (await db.$count(employees)) > 0;
};

export const getDBStats = async () => {
  const [
    customersCount,
    employeesCount,
    productsCount,
    productsActiveCount,
    ordersCount,
    suppliersCount,
  ] = await Promise.all([
    db.$count(customers),
    db.$count(employees),
    db.$count(products),
    db.$count(products, eq(products.discontinued, false)),
    db.$count(orders),
    db.$count(suppliers),
  ]);

  return {
    customersCount,
    employeesCount,
    productsCount,
    productsActiveCount,
    ordersCount,
    suppliersCount,
  };
};

export type DBStatsType = Awaited<ReturnType<typeof getDBStats>>;

export const getTopEmployeesBySales = async (limit = 3) => {
  return await db
    .select({
      employeeId: employees.employeeId,
      titleOfCourtesy: employees.titleOfCourtesy,
      firstName: employees.firstName,
      lastName: employees.lastName,
      totalSales: sql<CurrencyType>`SUM(${orderDetails.unitPrice} * ${orderDetails.quantity} * (1 - ${orderDetails.discount}))`,
      totalOrders: count(orders.orderId),
    })
    .from(employees)
    .leftJoin(orders, eq(employees.employeeId, orders.employeeId))
    .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
    .groupBy(employees.employeeId)
    .orderBy((t) => desc(t.totalSales))
    .limit(limit);
};

const ADDRESS_COLUMNS = {
  address: true,
  city: true,
  region: true,
  postalCode: true,
  country: true,
} as const;

// Customers

const CUSTOMER_COLUMNS = {
  customerId: true,
  companyName: true,
  contactName: true,
  contactTitle: true,
  ...ADDRESS_COLUMNS,
  phone: true,
  fax: true,
} as const;

export const getCustomers = async (): Promise<ICustomers> => {
  const result = await db.query.customers.findMany({
    columns: CUSTOMER_COLUMNS,
  });

  return result;
};

export const getCustomer = async ({
  customerId,
}: {
  customerId: CustomerIdType | null;
}): Promise<ICustomer | undefined> => {
  if (!customerId) return;

  const result = await db.query.customers.findFirst({
    where: eq(customers.customerId, customerId),
    columns: CUSTOMER_COLUMNS,
  });

  return checkNotFoundAndReturn(result);
};

export const getCustomerByOrderId = async ({
  orderId,
}: {
  orderId: number;
}): Promise<ICustomer> => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.orderId, orderId),
    columns: {},
    with: {
      customer: {
        columns: CUSTOMER_COLUMNS,
      },
    },
  });

  return checkNotFoundAndReturn(order?.customer);
};

// Employees

const EMPLOYEE_COLUMNS = {
  employeeId: true,
  lastName: true,
  firstName: true,
  title: true,
  titleOfCourtesy: true,
  birthDate: true,
  hireDate: true,
  ...ADDRESS_COLUMNS,
  homePhone: true,
  extension: true,
  notes: true,
  reportsTo: true,
  photoPath: true,
} as const;

export const getEmployees = async (): Promise<IEmployees> => {
  const result = await db.query.employees.findMany({
    columns: EMPLOYEE_COLUMNS,
  });

  return result;
};

export const getEmployee = async ({
  employeeId,
}: {
  employeeId: number | null;
}): Promise<IEmployee | undefined> => {
  if (!employeeId) return;

  const result = await db.query.employees.findFirst({
    where: eq(employees.employeeId, employeeId),
    columns: EMPLOYEE_COLUMNS,
  });

  return checkNotFoundAndReturn(result);
};

export const getEmployeeByOrderId = async ({
  orderId,
}: {
  orderId: number;
}): Promise<IEmployee> => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.orderId, orderId),
    columns: {},
    with: {
      employee: {
        columns: EMPLOYEE_COLUMNS,
      },
    },
  });

  return checkNotFoundAndReturn(order?.employee);
};

const TERRITORY_COLUMNS = {
  territoryId: true,
  territoryDescription: true,
  regionId: true,
} as const;

export const getEmployeeTerritories = async ({
  employeeId,
}: {
  employeeId: number | null;
}): Promise<ITerritories | undefined> => {
  if (!employeeId) return;

  const result = await db.query.employeeTerritories.findMany({
    where: eq(employeeTerritories.employeeId, employeeId),
    columns: {},
    with: {
      territory: {
        columns: TERRITORY_COLUMNS,
      },
    },
  });

  return uniqBy(
    result.map((employeeTerritory) => employeeTerritory.territory),
    (item) => item.territoryId,
  );
};

const REGION_COLUMNS = {
  regionId: true,
  regionDescription: true,
} as const;

export const getRegions = async (): Promise<IRegions> => {
  const result = await db.query.region.findMany({
    columns: REGION_COLUMNS,
  });
  return result;
};

// Orders

const ORDER_COLUMNS = {
  orderId: true,
  customerId: true,
  employeeId: true,
  orderDate: true,
  requiredDate: true,
  shippedDate: true,
  shipVia: true,
  freight: true,
  shipName: true,
  shipAddress: true,
  shipCity: true,
  shipRegion: true,
  shipPostalCode: true,
  shipCountry: true,
} as const;

export const getOrders = async ({
  customerId,
  employeeId,
  shipperId,
}: {
  customerId?: CustomerIdType | undefined;
  employeeId?: number | undefined;
  shipperId?: number | undefined;
} = {}): Promise<IOrders> => {
  const result = await db.query.orders.findMany({
    where: and(
      customerId ? eq(orders.customerId, customerId) : undefined,
      employeeId ? eq(orders.employeeId, employeeId) : undefined,
      shipperId ? eq(orders.shipVia, shipperId) : undefined,
    ),
    columns: ORDER_COLUMNS,
  });

  return result;
};

export const getOrder = async ({
  orderId,
}: {
  orderId: number;
}): Promise<IOrder> => {
  const result = await db.query.orders.findFirst({
    where: eq(orders.orderId, orderId),
    columns: ORDER_COLUMNS,
  });

  return checkNotFoundAndReturn(result);
};

const ORDER_DETAILS_COLUMNS = {
  orderId: true,
  productId: true,
  unitPrice: true,
  quantity: true,
  discount: true,
} as const;

export const getOrderDetails = async ({
  orderId,
  productId,
}: {
  orderId?: number | undefined;
  productId?: number | undefined;
}): Promise<IOrderDetails> => {
  const result = await db.query.orderDetails.findMany({
    where: and(
      orderId ? eq(orderDetails.orderId, orderId) : undefined,
      productId ? eq(orderDetails.productId, productId) : undefined,
    ),
    columns: ORDER_DETAILS_COLUMNS,
  });

  return result;
};

// Products

const PRODUCT_COLUMNS = {
  productId: true,
  productName: true,
  supplierId: true,
  categoryId: true,
  quantityPerUnit: true,
  unitPrice: true,
  unitsInStock: true,
  unitsOnOrder: true,
  reorderLevel: true,
  discontinued: true,
} as const;

export const getProducts = async ({
  supplierId,
}: {
  supplierId?: number | undefined;
} = {}): Promise<IProducts> => {
  const result = await db.query.products.findMany({
    where: supplierId ? eq(products.supplierId, supplierId) : undefined,
    columns: PRODUCT_COLUMNS,
  });

  return result;
};

export const getProductsByOrderId = async ({
  orderId,
}: {
  orderId?: number | undefined;
} = {}): Promise<IProducts> => {
  const result = await db.query.orderDetails.findMany({
    where: orderId ? eq(orderDetails.orderId, orderId) : undefined,
    columns: {},
    with: {
      product: {
        columns: PRODUCT_COLUMNS,
      },
    },
  });

  return uniqBy(
    result.map((item) => item.product),
    (item) => item.productId,
  );
};

export const getProduct = async ({
  productId,
}: {
  productId: number;
}): Promise<IProduct> => {
  const result = await db.query.products.findFirst({
    where: eq(products.productId, productId),
    columns: PRODUCT_COLUMNS,
  });

  return checkNotFoundAndReturn(result);
};

const CATEGORY_COLUMNS = {
  categoryId: true,
  categoryName: true,
  description: true,
} as const;

export const getCategories = async (): Promise<ICategories> => {
  const result = await db.query.categories.findMany({
    columns: CATEGORY_COLUMNS,
  });

  return result;
};

// Shippers

const SHIPPER_COLUMNS = {
  shipperId: true,
  companyName: true,
  phone: true,
} as const;

export const getShippers = async (): Promise<IShippers> => {
  const result = await db.query.shippers.findMany({
    columns: SHIPPER_COLUMNS,
  });

  return result;
};

export const getShipperByOrderId = async ({
  orderId,
}: {
  orderId: number;
}): Promise<IShipper> => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.orderId, orderId),
    columns: {},
    with: {
      shipper: {
        columns: SHIPPER_COLUMNS,
      },
    },
  });

  return checkNotFoundAndReturn(order?.shipper);
};

// Suppliers

const SUPPLIER_COLUMNS = {
  supplierId: true,
  companyName: true,
  contactName: true,
  contactTitle: true,
  ...ADDRESS_COLUMNS,
  phone: true,
  fax: true,
  homepage: true,
} as const;

export const getSuppliers = async (): Promise<ISuppliers> => {
  const result = await db.query.suppliers.findMany({
    columns: SUPPLIER_COLUMNS,
  });

  return result;
};

export const getSupplier = async ({
  supplierId,
}: {
  supplierId: number;
}): Promise<ISupplier> => {
  const result = await db.query.suppliers.findFirst({
    where: eq(suppliers.supplierId, supplierId),
    columns: SUPPLIER_COLUMNS,
  });

  return checkNotFoundAndReturn(result);
};
