import AxiosHttpClient from "@/infra/axios-http-client.js";

const axiosHttpClientFactory = () => new AxiosHttpClient();

export default axiosHttpClientFactory;
