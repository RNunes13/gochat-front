
import { User } from '../../models';
import {
  AuthActionTypes,
  UPDATE_USER,
} from './types';

export function updateUser(user: User | null): AuthActionTypes {
  return {
    type: UPDATE_USER,
    payload: user,
  }
}
