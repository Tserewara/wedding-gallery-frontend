import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";
import RemoteLikePhoto from "@/domain/usecases/remote-like-photo";

const remoteLikePhotoFactory = () => {
  return new RemoteLikePhoto(apiUrlFactory("/like"), axiosHttpClientFactory());
};

export default remoteLikePhotoFactory;
