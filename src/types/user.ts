export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  boats: {
    id: number;
    name: string;
    capacity: number;
    adminsIds: string[];
  }[];

};