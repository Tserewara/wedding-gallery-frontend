import RemoteAddPhoto from "@/domain/usecases/remote-add-photo";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";

const remoteAddPhotoFactory = () => {
  return new RemoteAddPhoto(apiUrlFactory("/photos"), axiosHttpClientFactory());
};

export default remoteAddPhotoFactory;
