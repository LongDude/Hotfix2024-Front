import { Api } from "./Api";
import { getCities } from "./mock/getCities";
import { getFlights } from "./mock/getFlights";

const useMocks = false;

export class FlightApi extends Api {
  static async getCities() {
	const useMocks = false;
    return await (useMocks
      ? new Promise((res) => res(getCities()))
      : this.get("cities/"));
  }

  static async getFlights(filters) {
	// const useMocks = false;
    return await (useMocks
      ? new Promise((res) => res(getFlights()))
      : this.get("flights/", filters));
  }
}
