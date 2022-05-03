class UnexpectedError extends Error {
  constructor() {
    super("Something went wrong. Try to refresh the page.");
    this.name = "UnexpectedError";
  }
}

export default UnexpectedError;
