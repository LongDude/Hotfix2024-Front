import { Api } from './Api';
import { getRequests } from './mock/getRequests';
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
          phone: res.phonenumber,
          token: res.token,
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

  static async changeProfile(userObj) {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.put('change-profile/', userObj)));
  }

  static async getRequests() {
    return (await (useMocks
      ? new Promise((res) => res(getRequests()))
      : this.get('requests/')));
  }
}
