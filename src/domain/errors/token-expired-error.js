class TokenExpiredError extends Error {
  constructor() {
    super("Token expired. Log in again.");
    this.name = "TokenExpiredError";
  }
}

export default TokenExpiredError;
