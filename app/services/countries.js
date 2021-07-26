const countriesMock = require("../mocks/countries.json");
const { getPage, findItemById, ClientError } = require("../helpers");

// In memory countries
const countries = [...countriesMock];

// Get all countries
function getAllPaged(queryParams) {
  return getPage(countries, queryParams);
}

// Get a country by id
function getById(countryId) {
  const country = findItemById(countries, countryId);
  if (!country) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown country",
    });
  }
  return country;
}

module.exports = {
  getAllPaged,
  getById,
};
