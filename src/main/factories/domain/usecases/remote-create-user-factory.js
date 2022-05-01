import RemoteCreateUser from "@/domain/usecases/remote-create-user";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";

const remoteCreateUserFactory = () => {
  return new RemoteCreateUser(
    apiUrlFactory("/register"),
    axiosHttpClientFactory()
  );
};

export default remoteCreateUserFactory;
