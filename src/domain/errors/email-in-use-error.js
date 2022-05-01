class EmailInUserError extends Error {
  constructor() {
    super("Email has already been taken");
    this.name = "EmailInUserError";
  }
}

export default EmailInUserError;
