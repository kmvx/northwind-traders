import {
  foreignKey,
  pgTable,
  primaryKey,
  smallint,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

import {
  brandedCountryDBColumn,
  brandedCurrencyDBColumn,
  brandedDateStringDBColumn,
  brandedPhoneDBColumn,
  integerBooleanDBColumn,
} from './DBColumns';

export const usStates = pgTable('us_states', {
  stateId: smallint('state_id').primaryKey().notNull(),
  stateName: varchar('state_name', { length: 100 }),
  stateAbbr: varchar('state_abbr', { length: 2 }),
  stateRegion: varchar('state_region', { length: 50 }),
});

export const customers = pgTable('customers', {
  customerId: varchar('customer_id', { length: 5 }).primaryKey().notNull(),
  companyName: varchar('company_name', { length: 40 }).notNull(),
  contactName: varchar('contact_name', { length: 30 }),
  contactTitle: varchar('contact_title', { length: 30 }),
  address: varchar({ length: 60 }),
  city: varchar({ length: 15 }),
  region: varchar({ length: 15 }),
  postalCode: varchar('postal_code', { length: 10 }),
  country: brandedCountryDBColumn({ length: 15 }),
  phone: brandedPhoneDBColumn('phone', { length: 24 }),
  fax: brandedPhoneDBColumn('fax', { length: 24 }),
});

export const orders = pgTable(
  'orders',
  {
    orderId: smallint('order_id').primaryKey().notNull(),
    customerId: varchar('customer_id', { length: 5 }),
    employeeId: smallint('employee_id'),
    orderDate: brandedDateStringDBColumn('order_date'),
    requiredDate: brandedDateStringDBColumn('required_date'),
    shippedDate: brandedDateStringDBColumn('shipped_date'),
    shipVia: smallint('ship_via'),
    freight: brandedCurrencyDBColumn(),
    shipName: varchar('ship_name', { length: 40 }),
    shipAddress: varchar('ship_address', { length: 60 }),
    shipCity: varchar('ship_city', { length: 15 }),
    shipRegion: varchar('ship_region', { length: 15 }),
    shipPostalCode: varchar('ship_postal_code', { length: 10 }),
    shipCountry: brandedCountryDBColumn('ship_country', { length: 15 }),
  },
  (table) => [
    foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.customerId],
      name: 'fk_orders_customers',
    }),
    foreignKey({
      columns: [table.employeeId],
      foreignColumns: [employees.employeeId],
      name: 'fk_orders_employees',
    }),
    foreignKey({
      columns: [table.shipVia],
      foreignColumns: [shippers.shipperId],
      name: 'fk_orders_shippers',
    }),
  ],
);

export const employees = pgTable(
  'employees',
  {
    employeeId: smallint('employee_id').primaryKey().notNull(),
    lastName: varchar('last_name', { length: 20 }).notNull(),
    firstName: varchar('first_name', { length: 10 }).notNull(),
    title: varchar({ length: 30 }),
    titleOfCourtesy: varchar('title_of_courtesy', { length: 25 }),
    birthDate: brandedDateStringDBColumn('birth_date'),
    hireDate: brandedDateStringDBColumn('hire_date'),
    address: varchar({ length: 60 }),
    city: varchar({ length: 15 }),
    region: varchar({ length: 15 }),
    postalCode: varchar('postal_code', { length: 10 }),
    country: brandedCountryDBColumn({ length: 15 }),
    homePhone: brandedPhoneDBColumn('home_phone', { length: 24 }),
    extension: varchar({ length: 4 }),
    // TODO: failed to parse database type 'bytea'
    // photo: unknown('photo'),
    notes: text(),
    reportsTo: smallint('reports_to'),
    photoPath: varchar('photo_path', { length: 255 }),
  },
  (table) => [
    foreignKey({
      columns: [table.reportsTo],
      foreignColumns: [table.employeeId],
      name: 'fk_employees_employees',
    }),
  ],
);

export const shippers = pgTable('shippers', {
  shipperId: smallint('shipper_id').primaryKey().notNull(),
  companyName: varchar('company_name', { length: 40 }).notNull(),
  phone: brandedPhoneDBColumn({ length: 24 }),
});

export const products = pgTable(
  'products',
  {
    productId: smallint('product_id').primaryKey().notNull(),
    productName: varchar('product_name', { length: 40 }).notNull(),
    supplierId: smallint('supplier_id'),
    categoryId: smallint('category_id'),
    quantityPerUnit: varchar('quantity_per_unit', { length: 20 }),
    unitPrice: brandedCurrencyDBColumn('unit_price'),
    unitsInStock: smallint('units_in_stock'),
    unitsOnOrder: smallint('units_on_order'),
    reorderLevel: smallint('reorder_level'),
    discontinued: integerBooleanDBColumn().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.categoryId],
      name: 'fk_products_categories',
    }),
    foreignKey({
      columns: [table.supplierId],
      foreignColumns: [suppliers.supplierId],
      name: 'fk_products_suppliers',
    }),
  ],
);

export const categories = pgTable('categories', {
  categoryId: smallint('category_id').primaryKey().notNull(),
  categoryName: varchar('category_name', { length: 15 }).notNull(),
  description: text(),
  // TODO: failed to parse database type 'bytea'
  // picture: unknown('picture'),
});

export const suppliers = pgTable('suppliers', {
  supplierId: smallint('supplier_id').primaryKey().notNull(),
  companyName: varchar('company_name', { length: 40 }).notNull(),
  contactName: varchar('contact_name', { length: 30 }),
  contactTitle: varchar('contact_title', { length: 30 }),
  address: varchar({ length: 60 }),
  city: varchar({ length: 15 }),
  region: varchar({ length: 15 }),
  postalCode: varchar('postal_code', { length: 10 }),
  country: brandedCountryDBColumn({ length: 15 }),
  phone: brandedPhoneDBColumn({ length: 24 }),
  fax: brandedPhoneDBColumn({ length: 24 }),
  homepage: text(),
});

export const region = pgTable('region', {
  regionId: smallint('region_id').primaryKey().notNull(),
  regionDescription: varchar('region_description', { length: 60 }).notNull(),
});

export const territories = pgTable(
  'territories',
  {
    territoryId: varchar('territory_id', { length: 20 }).primaryKey().notNull(),
    territoryDescription: varchar('territory_description', {
      length: 60,
    }).notNull(),
    regionId: smallint('region_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.regionId],
      foreignColumns: [region.regionId],
      name: 'fk_territories_region',
    }),
  ],
);

export const customerDemographics = pgTable('customer_demographics', {
  customerTypeId: varchar('customer_type_id', { length: 5 })
    .primaryKey()
    .notNull(),
  customerDesc: text('customer_desc'),
});

export const employeeTerritories = pgTable(
  'employee_territories',
  {
    employeeId: smallint('employee_id').notNull(),
    territoryId: varchar('territory_id', { length: 20 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.territoryId],
      foreignColumns: [territories.territoryId],
      name: 'fk_employee_territories_territories',
    }),
    foreignKey({
      columns: [table.employeeId],
      foreignColumns: [employees.employeeId],
      name: 'fk_employee_territories_employees',
    }),
    primaryKey({
      columns: [table.employeeId, table.territoryId],
      name: 'pk_employee_territories',
    }),
  ],
);

export const customerCustomerDemo = pgTable(
  'customer_customer_demo',
  {
    customerId: varchar('customer_id', { length: 5 }).notNull(),
    customerTypeId: varchar('customer_type_id', { length: 5 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.customerTypeId],
      foreignColumns: [customerDemographics.customerTypeId],
      name: 'fk_customer_customer_demo_customer_demographics',
    }),
    foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.customerId],
      name: 'fk_customer_customer_demo_customers',
    }),
    primaryKey({
      columns: [table.customerId, table.customerTypeId],
      name: 'pk_customer_customer_demo',
    }),
  ],
);

export const orderDetails = pgTable(
  'order_details',
  {
    orderId: smallint('order_id').notNull(),
    productId: smallint('product_id').notNull(),
    unitPrice: brandedCurrencyDBColumn('unit_price').notNull(),
    quantity: smallint().notNull(),
    discount: brandedCurrencyDBColumn().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.productId],
      name: 'fk_order_details_products',
    }),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.orderId],
      name: 'fk_order_details_orders',
    }),
    primaryKey({
      columns: [table.orderId, table.productId],
      name: 'pk_order_details',
    }),
  ],
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.customerId],
  }),
  employee: one(employees, {
    fields: [orders.employeeId],
    references: [employees.employeeId],
  }),
  shipper: one(shippers, {
    fields: [orders.shipVia],
    references: [shippers.shipperId],
  }),
  orderDetails: many(orderDetails),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
  customerCustomerDemos: many(customerCustomerDemo),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  orders: many(orders),
  employee: one(employees, {
    fields: [employees.reportsTo],
    references: [employees.employeeId],
    relationName: 'employees_reportsTo_employees_employeeId',
  }),
  employees: many(employees, {
    relationName: 'employees_reportsTo_employees_employeeId',
  }),
  employeeTerritories: many(employeeTerritories),
}));

export const shippersRelations = relations(shippers, ({ many }) => ({
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.categoryId],
  }),
  supplier: one(suppliers, {
    fields: [products.supplierId],
    references: [suppliers.supplierId],
  }),
  orderDetails: many(orderDetails),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  products: many(products),
}));

export const territoriesRelations = relations(territories, ({ one, many }) => ({
  region: one(region, {
    fields: [territories.regionId],
    references: [region.regionId],
  }),
  employeeTerritories: many(employeeTerritories),
}));

export const regionRelations = relations(region, ({ many }) => ({
  territories: many(territories),
}));

export const employeeTerritoriesRelations = relations(
  employeeTerritories,
  ({ one }) => ({
    territory: one(territories, {
      fields: [employeeTerritories.territoryId],
      references: [territories.territoryId],
    }),
    employee: one(employees, {
      fields: [employeeTerritories.employeeId],
      references: [employees.employeeId],
    }),
  }),
);

export const customerCustomerDemoRelations = relations(
  customerCustomerDemo,
  ({ one }) => ({
    customerDemographic: one(customerDemographics, {
      fields: [customerCustomerDemo.customerTypeId],
      references: [customerDemographics.customerTypeId],
    }),
    customer: one(customers, {
      fields: [customerCustomerDemo.customerId],
      references: [customers.customerId],
    }),
  }),
);

export const customerDemographicsRelations = relations(
  customerDemographics,
  ({ many }) => ({
    customerCustomerDemos: many(customerCustomerDemo),
  }),
);

export const orderDetailsRelations = relations(orderDetails, ({ one }) => ({
  product: one(products, {
    fields: [orderDetails.productId],
    references: [products.productId],
  }),
  order: one(orders, {
    fields: [orderDetails.orderId],
    references: [orders.orderId],
  }),
}));
