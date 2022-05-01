import { RemoteAuthentication } from "@/domain/usecases/remote-authentication";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory.js";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";

const remoteAuthenticationFactory = () => {
  return new RemoteAuthentication(
    apiUrlFactory("/login"),
    axiosHttpClientFactory()
  );
};

export default remoteAuthenticationFactory;
