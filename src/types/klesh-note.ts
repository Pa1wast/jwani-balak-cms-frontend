import { Company } from './company';

export interface KleshNote {
  _id: number;
  company: Company;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewKleshNote {
  note: string;
  company: string;
}
