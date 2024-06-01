import { Api } from './Api';
import { getUser } from './mock/getUser';

const useMocks = true;

export class UserApi extends Api {
  static async login(login, password) {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.post('login/', { login, password }).then(res => {
        return {
          firstName: res.firstname,
          lastName: res.surname,
          login: res.email,
          gender: res.gender,
          phone: res.phonenumber
        }
      })) );
  }

  static async getUser() {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.get('user/')));
  }

  static async logout() {
    return (await (useMocks
      ? new Promise((res) => res(true))
      : this.get('logout/')));
  }

  static async register(userObj) {
    return (await (useMocks
      ? new Promise((res) => res(true))
      : this.post('register/', userObj)));
  }
}
