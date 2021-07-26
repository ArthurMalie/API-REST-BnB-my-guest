const cityService = require("../services/cities");

// Get all cities
function getAll(req, res) {
  res.status(200).send(cityService.getAllPaged(req.query));
}

// Get a city by id
function getById(req, res) {
  res.status(200).send(cityService.getById(req.params.cityId));
}

module.exports = {
  getAll,
  getById,
};
