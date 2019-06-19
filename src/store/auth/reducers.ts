
import {
  AuthActionTypes,
  AuthState,
  UPDATE_USER,
} from './types';

const initialState: AuthState = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }
    default:
      return state;
  }
}
