class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

export default InvalidCredentialsError;
