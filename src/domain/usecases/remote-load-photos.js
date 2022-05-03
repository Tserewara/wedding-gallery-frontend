class RemoteLoadPhotos {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async load() {
    const httpResponse = await this.httpClient.request(this.url, "get");
    switch (httpResponse.status) {
      case 200:
        return httpResponse.data;
    }
  }
}

export default RemoteLoadPhotos;
