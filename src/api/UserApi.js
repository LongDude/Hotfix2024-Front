import { Api } from "./Api";
import { getRequests } from "./mock/getRequests";
import { getUser } from "./mock/getUser";

const useMocks = false;

export class UserApi extends Api {
  static async login(login, password) {
    return await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.post("login/", { login, password }));
  }

  static async getUser() {
    return await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.get("user/").then((res) => {
          console.log(
            "l",
            {
              firstName: res.firstname,
              lastName: res.surname,
              login: res.email,
              gender: res.gender,
              phone: res.phonenumber,
            },
            res,
            getUser()
          );
          return {
            firstName: res.firstname,
            lastName: res.surname,
            login: res.email,
            gender: res.gender,
            phone: res.phonenumber,
            token: res.token,
          };
        }));
  }

  static async logout() {
    return await (useMocks
      ? new Promise((res) => res(true))
      : this.post("logout/"));
  }

  static async register(userObj) {
    return await (useMocks
      ? new Promise((res) => res(true))
      : this.post("register/", {
          email: userObj.login,
          firstname: userObj.firstName,
          surname: userObj.lastName,
          phonenumber: userObj.phone,
          gender: userObj.gender,
          password: userObj.password,
        }));
  }

  static async changeProfile(userObj) {
    return await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.put("change-profile/", userObj));
  }

  static async getRequests() {
    return await (useMocks
      ? new Promise((res) => res(getRequests()))
      : this.get("requests/"));
  }
}
