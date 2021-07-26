class ClientError {
  constructor({ statusCode = 400, code = "CLI_999", label = "Bad request" }) {
    this.statusCode = statusCode;
    this.code = code;
    this.label = label;
  }
}

module.exports = {
  ClientError,
};
