import MissingParamError from "@/domain/errors/missing-param-error";

class RemoteAddPhoto {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async add(userId, photo) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "post",
      {
        user_id: userId,
        photo: photo,
      },
      { "Content-Type": "multipart/form-data" }
    );
    switch (httpResponse.status) {
      case 400:
        throw new MissingParamError();
    }
  }
}

export default RemoteAddPhoto;
