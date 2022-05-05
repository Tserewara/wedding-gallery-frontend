import ServerError from "@/domain/errors/server-error";
import TokenExpiredError from "@/domain/errors/token-expired-error";

class RemoteLikePhoto {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async like(userId, photoId, token) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "post",
      {
        user_id: userId,
        photo_id: photoId,
      },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );
    switch (httpResponse.status) {
      case 204:
        return httpResponse.data;
      case 401:
        throw new TokenExpiredError();
      default:
        throw new ServerError();
    }
  }
}

export default RemoteLikePhoto;
