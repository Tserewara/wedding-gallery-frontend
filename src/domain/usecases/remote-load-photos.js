import ServerError from "@/domain/errors/server-error";

class RemoteLoadPhotos {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async load(page, userId, token) {
    const httpResponse = await this.httpClient.request(
      `${this.url}?page=${page}&user_id=${userId}`,
      "get",
      {},
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    switch (httpResponse.status) {
      case 200:
        return httpResponse.data;
      default:
        throw new ServerError();
    }
  }
}

export default RemoteLoadPhotos;
