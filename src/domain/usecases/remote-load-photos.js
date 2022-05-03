import ServerError from "@/domain/errors/server-error";

class RemoteLoadPhotos {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async load(page) {
    const httpResponse = await this.httpClient.request(
      `${this.url}?page=${page}`,
      "get"
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
