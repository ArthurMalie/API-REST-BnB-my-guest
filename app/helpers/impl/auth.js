const { ClientError } = require("./errors");

const API_TOKEN_HARDCODED = "123456789";

/**
 * Check API Token in request
 * @param {*} req
 */
function checkApiToken(req) {
  let success = false;
  const apiToken = req.headers.authorization;
  if (apiToken) {
    const apiTokenSplit = apiToken.split("Bearer ");
    if (apiTokenSplit.length === 2) {
      const apiTokenValue = apiTokenSplit[1];
      if (apiTokenValue === API_TOKEN_HARDCODED) {
        success = true;
      }
    }
  }

  if (!success) {
    throw new ClientError({
      statusCode: 401,
      code: "CLI_666",
      label: "Missing or invalid API Token",
    });
  }
}

module.exports = {
  checkApiToken,
};
