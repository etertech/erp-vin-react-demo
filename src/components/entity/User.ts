export interface User {
  token: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  roles: { id: number; name: string }[];
  enabled: boolean;
  tokenType: string;
  savedAt:number;
}