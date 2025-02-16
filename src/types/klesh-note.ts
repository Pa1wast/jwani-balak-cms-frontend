import { Company } from './company';

export interface KleshNote {
  _id: string;
  NO: number;
  company: Company;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewKleshNote {
  note: string;
  company: string;
}

export interface UpdatedKleshNote {
  note?: string;
  NO?: number;
}
