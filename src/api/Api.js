import axios from "axios";
import { TOKEN_STORAGE_NAME } from "@/const";

axios.defaults.baseURL = "http://localhost:8000/api";

function getConfig() {
  const token = sessionStorage.getItem(TOKEN_STORAGE_NAME);
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 30000,
  };
}

export class Api {
  static get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { ...getConfig(), params })
        .then(
          (response) => resolve(response.data),
          (err) => reject(err)
        )
        .catch((error) => reject(error));
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, getConfig())
        .then(
          (response) => resolve(response.data),
          (err) => reject(err)
        )
        .catch((error) => reject(error));
    });
  }

  static put(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, getConfig())
        .then(
          (response) => resolve(response.data),
          (err) => reject(err)
        )
        .catch((error) => reject(error));
    });
  }

  static delete(url) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, getConfig())
        .then(
          (response) => resolve(response.data),
          (err) => reject(err)
        )
        .catch((error) => reject(error));
    });
  }

  static patch(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(url, data, getConfig())
        .then(
          (response) => resolve(response.data),
          (err) => reject(err)
        )
        .catch((error) => reject(error));
    });
  }
}
