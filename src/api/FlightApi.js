import { Api } from "./Api";
import { getCities } from "./mock/getCities";
import { getFlights } from "./mock/getFlights";

const useMocks = true;

export class FlightApi extends Api {
	static async getCities() {
		return (await (useMocks
      ? new Promise((res) => res(getCities()))
      : this.get('cities/')));
	}

	static async getFlights(filters) {
		return (await (useMocks
      ? new Promise((res) => res(getFlights()))
      : this.get('flights/', filters)));
	}
}