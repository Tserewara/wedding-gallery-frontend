class UploadError extends Error {
  constructor() {
    super("Upload failed. Try again.");
    this.name = "UploadError";
  }
}

export default UploadError;
