export enum listViewTypes {
  GRID = 'GRID',
  ROW = 'ROW',
}

export interface NewCompany {
  companyName: string;
  address: string;
  logoPath: string;
}

export interface Company {
  _id: string;
  companyName: string;
  address: string;
  logoPath: string;
  createdAt: string;
  updatedAt: string;
}
