
import HttpClient from './httpClient';
import { User } from '../models';
import { ContactSchema } from '../models/Contact';

export default class Contact {
  private static http = new HttpClient({ baseUrl: `${process.env.API_URL}/api` });
  
  public static create(owner: User, contact_username: string): Promise<ContactSchema> {
    return new Promise(async (resolve, reject) => {
      try {
        const contactData = await this.http.post('/contacts', { owner, contact_username });

        const { data } = contactData;

        if (!data.success)
          throw data.error;

        resolve(data.data);
      } catch (exception) {
        reject(exception);
      }
    });
  }
}
