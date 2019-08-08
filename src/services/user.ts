
import HttpClient from './httpClient';
import { User as UserModel, Contact } from '../models';
import { HandlerError } from '../utils';
import { openSnackbar } from '../components/Notifier/Notifier';

export default class Useras {
  private static http = new HttpClient({ baseUrl: `${process.env.API_URL}/api` });
  
  public static checkUsernameAvailability(username: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const availability = await this.http.post('/users/username_availability', { username });

        const { data } = availability;

        if (!data.success) throw data.error;

        resolve(data.data);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public static getUserContacts(user: UserModel, callback: (contacts: Contact[]) => void) {
    this.http.get(`/users/${user.id}/contacts_info`)
    .then((res) => {
      const { data } = res;

      callback(data.data);
    })
    .catch((err) => {
      callback([]);

      openSnackbar({
        message: HandlerError.getErrorMessage(err),
        variant: 'error',
        delay: 10000,
      });
    });
  }
}
