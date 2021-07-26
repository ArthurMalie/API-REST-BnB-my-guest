const rentalService = require("../services/rentals");

// Get all rentals
function getAll(req, res) {
  res.status(200).send(rentalService.getAllPaged(req.query));
}

// Add a new rental
function addNew(req, res) {
  res.status(200).send(rentalService.addNew(req.body));
}

// Set the status of an existing rental to PAID
function pay(req, res) {
  res.status(200).send(rentalService.editStatus(req.params.rentalId, "PAID"));
}

// Set the status of an existing rental to CANCELLED
function cancel(req, res) {
  res
    .status(200)
    .send(rentalService.editStatus(req.params.rentalId, "CANCELLED"));
}

module.exports = {
  getAll,
  addNew,
  pay,
  cancel,
};
