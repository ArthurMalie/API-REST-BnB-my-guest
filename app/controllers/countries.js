const countryService = require("../services/countries");

// Get all countries
function getAll(req, res) {
  res.status(200).send(countryService.getAllPaged(req.query));
}

// Get a country by id
function getById(req, res) {
  res.status(200).send(countryService.getById(req.params.countryId));
}

module.exports = {
  getAll,
  getById,
};
