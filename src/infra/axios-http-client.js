import axios from "axios";

export class AxiosHttpClient {
  async request(url, method, data, headers) {
    try {
      return await axios.request({ url, method, data, headers });
    } catch (error) {
      return error.response;
    }
  }
}
