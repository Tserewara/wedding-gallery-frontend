class RemoteAddComment {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async add(userId, photoId, text, token) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "post",
      {
        user_id: userId,
        photo_id: photoId,
        text: text,
      },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );
    switch (httpResponse.status) {
      case 201:
        return httpResponse.data;
    }
  }
}

export default RemoteAddComment;
