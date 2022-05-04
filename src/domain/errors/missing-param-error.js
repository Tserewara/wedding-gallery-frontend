class MissingParamError extends Error {
  constructor() {
    super("Some parameter is missing");
    this.name = "MissingParamError";
  }
}

export default MissingParamError;
