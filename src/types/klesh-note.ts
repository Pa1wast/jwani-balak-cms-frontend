import { Company } from './company';

export interface KleshNote {
  _id: string;
  company: Company;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewKleshNote {
  note: string;
  company: string;
}
