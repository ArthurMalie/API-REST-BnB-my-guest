const apartmentService = require("../services/apartments");

// Get all apartments
function getAll(req, res) {
  res.status(200).send(apartmentService.getAllPaged(req.query));
}

// Get a apartment by id
function getById(req, res) {
  res.status(200).send(apartmentService.getById(req.params.apartmentId));
}

// Add a new apartment
function addNew(req, res) {
  res.status(200).send(apartmentService.addNew(req.body));
}

// Update an existing apartment
function updateApartment(req, res) {
  res
    .status(200)
    .send(apartmentService.updateApartment(req.params.apartmentId, req.body));
}

// Delete an existing apartment
function deleteApartment(req, res) {
  res
    .status(204)
    .send(apartmentService.deleteApartment(req.params.apartmentId));
}

module.exports = {
  getAll,
  getById,
  addNew,
  updateApartment,
  deleteApartment,
};
