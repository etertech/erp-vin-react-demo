import { Address } from "./Address"

export interface Supplier {
  id?: number;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: Address;
  addedDate: string;

}