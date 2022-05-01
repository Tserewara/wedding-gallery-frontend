class MissingParamError extends Error {
  constructor() {
    super("You must fill all the fields.");
    this.name = "MissingParamError";
  }
}

export default MissingParamError;
