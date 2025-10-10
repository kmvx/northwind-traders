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
