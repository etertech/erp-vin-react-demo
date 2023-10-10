import { Address } from "./Address"

export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  telephone: string;
  address: Address;
  addedDate: string;

}