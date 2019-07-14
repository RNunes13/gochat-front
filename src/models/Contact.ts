
export interface Contact {
  id: number;
  name: string;
  username: string;
  image_url: string | null;
}

export interface ContactSchema {
  ownerId: number;
  contactId: number;
  createdAt: string;
  updatedAt: string;
}
