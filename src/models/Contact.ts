
export interface Contact {
  id: number;
  name: string;
  status: 'accept' | 'pending' | 'reject';
  username: string;
  image_url: string | null;
}

export interface ContactSchema {
  ownerId: number;
  contactId: number;
  createdAt: string;
  updatedAt: string;
}
