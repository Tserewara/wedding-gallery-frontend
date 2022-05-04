import RemoteApprovePhoto from "@/domain/usecases/remote-approve-photo";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";

const remoteApprovePhotoFactory = () => {
  return new RemoteApprovePhoto(
    apiUrlFactory("/photos"),
    axiosHttpClientFactory()
  );
};

export default remoteApprovePhotoFactory;
