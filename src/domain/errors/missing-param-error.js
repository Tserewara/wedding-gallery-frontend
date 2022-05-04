class MissingParamError extends Error {
  constructor() {
    super("Some param is missing");
    this.name = "MissingParamError";
  }
}

export default MissingParamError;
