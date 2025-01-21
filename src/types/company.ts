export enum listViewTypes {
  GRID = 'GRID',
  ROW = 'ROW',
}

export interface NewCompany {
  companyName: string;
  address: string;
  logo: File;
}

export interface Company {
  _id: string;
  companyName: string;
  address: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}
