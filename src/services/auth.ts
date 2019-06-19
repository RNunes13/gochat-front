
import HttpClient from './httpClient';
import { User } from '../models';
import { USER_TOKEN } from '../models/typings';

export default class Auth {
  private static http = new HttpClient({ baseUrl: `${process.env.API_URL}/api` });
  private static currentUser: User | null = null;

  public static getCurrentUser() {
    return this.currentUser;
  }

  public static login(username: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {

      try {
        const loginData = await this.http.post('/login', { username, password });

        const { data } = loginData;

        if (!data.success)
          throw data.error;

        sessionStorage.setItem(USER_TOKEN, data.data);

        this.checkUserLogged((user) => resolve(user));
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public static signUp(name: string, username: string, email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await this.http.post('/users', { name, username, email, password });

        const { data } = userData;

        if (!data.success)
          throw data.error;

        const user = await this.login(username, password);

        resolve(user);
      } catch (exception) {
        reject(exception);
      }
    });
  }

  public static checkUserLogged(callback: (user: User | null) => void) {
    this.http.get('/checkUser')
      .then(({ data }) => {
        if (!data.success) throw data.error

        this.currentUser = data.data;
        callback(this.currentUser);
      })
      .catch((err) => {
        console.error(err.message ? err.message : err);
        sessionStorage.removeItem(USER_TOKEN);
        callback(null);
      });
  }
}
