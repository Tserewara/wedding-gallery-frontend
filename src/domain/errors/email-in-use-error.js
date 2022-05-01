class EmailInUseError extends Error {
  constructor() {
    super("Email has already been taken");
    this.name = "EmailInUseError";
  }
}

export default EmailInUseError;
