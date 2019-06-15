
import { User } from '../../models';

export const UPDATE_USER = 'UPDATE_USER';

export interface AuthState {
  user: User | null;
}

interface UpdatePageAction {
  type: typeof UPDATE_USER,
  payload: User | null,
}

export type AuthActionTypes = UpdatePageAction;
