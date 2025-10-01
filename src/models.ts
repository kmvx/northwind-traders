interface IAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  region: string;
}

export interface IEmployee extends IAddress {
  birthDate: string;
  employeeId: number;
  firstName: string;
  homePhone: string;
  lastName: string;
  notes: string;
  reportsTo: number;
  title: string;
  titleOfCourtesy: string;
  photo: string;
  photoPath: string;
}
export type IEmployees = IEmployee[];
