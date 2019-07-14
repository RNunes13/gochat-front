
import { Contact } from "../../models";

export const UPDATE_LOADING_CONTACTS = 'UPDATE_LOADING_CONTACTS';
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';

export interface ContactState {
  loadingContacts: boolean;
  contacts: Contact[];
}

interface UpdateLoadingContactsAction {
  type: typeof UPDATE_LOADING_CONTACTS,
  payload: boolean,
}

interface UpdateContactsAction {
  type: typeof UPDATE_CONTACTS,
  payload: Contact[],
}

export type ContactActionTypes = UpdateLoadingContactsAction | UpdateContactsAction;
