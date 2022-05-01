import EmailInUseError from "@/domain/errors/email-in-use-error";

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
      default:
        break;
    }
  }
}

export default RemoteCreateUser;
