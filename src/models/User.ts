
import { Contact } from './Contact';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  disabled: boolean;
  image_url: string | null;
  rooms?: any,
  contacts?: Contact[];
  createdAt: string;
  updatedAt: string;
}
