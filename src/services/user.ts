
import HttpClient from './httpClient';

export default class Auth {
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
}
