import EmailInUseError from "@/domain/errors/email-in-use-error";
import MissingParamError from "@/domain/errors/missing-param-error";

class RemoteCreateUser {
  constructor(url, httpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async create(name, email, password, isAdmin) {
    const httpResponse = await this.httpClient.request(
      this.url,
      "post",
      {
        name: name,
        email: email,
        password: password,
        is_admin: isAdmin,
      },
      {}
    );
    switch (httpResponse.status) {
      case 409:
        throw new EmailInUseError();
      case 400:
        throw new MissingParamError();
      default:
        break;
    }
  }
}

export default RemoteCreateUser;
