class RemoteApprovePhoto {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async approve(userId, photoId, token) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "patch",
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
      case 200:
        return httpResponse.data;
      case 404:
        return httpResponse.data;
    }
  }
}

export default RemoteApprovePhoto;
