import { User } from './user';
export interface Product{
  id: number;
  name: string;
  price: number;
  quentity: number;
  category: string;
  userId: number;
  user: User | undefined;
}
