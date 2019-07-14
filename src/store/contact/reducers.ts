
import {
  ContactActionTypes,
  ContactState,
  UPDATE_LOADING_CONTACTS,
  UPDATE_CONTACTS,
} from './types';

const initialState: ContactState = {
  contacts: [],
  loadingContacts: true,
};

export function contactReducer(state = initialState, action: ContactActionTypes): ContactState {
  switch (action.type) {
    case UPDATE_LOADING_CONTACTS: {
      return {
        ...state,
        loadingContacts: action.payload,
      }
    }
    case UPDATE_CONTACTS: {
      return {
        ...state,
        contacts: action.payload,
      }
    }
    default:
      return state;
  }
}
