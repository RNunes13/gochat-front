
import { Contact } from '../../models';

import {
  ContactActionTypes,
  UPDATE_LOADING_CONTACTS,
  UPDATE_CONTACTS,
} from './types';

export function updateLoadingContacts(isLoading: boolean): ContactActionTypes {
  return {
    type: UPDATE_LOADING_CONTACTS,
    payload: isLoading,
  }
}

export function updateContacts(contacts: Contact[]): ContactActionTypes {
  return {
    type: UPDATE_CONTACTS,
    payload: contacts,
  }
}
