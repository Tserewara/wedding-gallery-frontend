import RemoteLoadPhotos from "@/domain/usecases/remote-load-photos";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";

const remoteLoadPhotosFactory = () => {
  return new RemoteLoadPhotos(
    apiUrlFactory("/photos"),
    axiosHttpClientFactory()
  );
};

export default remoteLoadPhotosFactory;
