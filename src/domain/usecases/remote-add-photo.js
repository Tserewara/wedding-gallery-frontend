import MissingParamError from "@/domain/errors/missing-param-error";
import UploadError from "@/domain/errors/upload-error";

class RemoteAddPhoto {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async add(userId, photo, token) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "post",
      {
        user_id: userId,
        photo: photo,
      },
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    switch (httpResponse.status) {
      case 201:
        return httpResponse.data;
      case 400:
        throw new MissingParamError();
      case 500:
        throw new UploadError();
    }
  }
}

export default RemoteAddPhoto;
