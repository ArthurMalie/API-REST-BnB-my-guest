const { v4: uuid } = require("uuid");

/**
 * Generate a random uuid v4.
 */
function randomUuid() {
  return uuid();
}

module.exports = {
  randomUuid,
};
