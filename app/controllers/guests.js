const guestService = require("../services/guests");

// Get all guests
function getAll(req, res) {
  res.status(200).send(guestService.getAllPaged(req.query));
}

// Get a guests by id
function getById(req, res) {
  res.status(200).send(guestService.getById(req.params.guestId));
}

// Add a new guest
function addNew(req, res) {
  res.status(200).send(guestService.addNew(req.body));
}

// Update an existing guest
function updateGuest(req, res) {
  res.status(200).send(guestService.updateGuest(req.params.guestId, req.body));
}

// Delete an existing guest
function deleteGuest(req, res) {
  res.status(204).send(guestService.deleteGuest(req.params.guestId));
}

module.exports = {
  getAll,
  getById,
  addNew,
  updateGuest,
  deleteGuest,
};
