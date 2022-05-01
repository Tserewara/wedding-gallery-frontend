import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";

export class RemoteAuthentication {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async auth(email, password) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "post",
      {
        email,
        password,
      },
      {}
    );
    switch (httpResponse.status) {
      case 403:
        throw new InvalidCredentialsError();
      default:
        break;
    }
  }
}
