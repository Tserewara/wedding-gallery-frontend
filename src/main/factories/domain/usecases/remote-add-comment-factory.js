import RemoteAddComment from "@/domain/usecases/remote-add-comment";
import apiUrlFactory from "@/main/factories/infra/api-url-factory";
import axiosHttpClientFactory from "@/main/factories/infra/axios-http-client-factory";

const remoteAddCommentFactory = () => {
  return new RemoteAddComment(
    apiUrlFactory("/comment"),
    axiosHttpClientFactory()
  );
};

export default remoteAddCommentFactory;
