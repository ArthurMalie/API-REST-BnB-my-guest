const rentalsMock = require("../mocks/rentals.json");
const {
  getPage,
  findItemById,
  updateItem,
  ClientError,
  addItem,
} = require("../helpers");
const guestService = require("./guests.js");
const apartmentService = require("./apartments.js");

// In memory rentals
const rentals = [...rentalsMock];

// Get all rentals
function getAllPaged(queryParams) {
  return getPage(rentals, queryParams);
}

// Get a rental by id
function getById(rentalId) {
  const rental = findItemById(rentals, rentalId);
  if (!rental) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown rental",
    });
  }
  return rental;
}

// Add a new rental
function addNew(newRental) {
  // Check that guest and apartment exist
  guestService.getById(newRental.guestId);
  apartmentService.getById(newRental.apartmentId);

  const rental = addItem(rentals, newRental);
  if(rental.status == null)
    rental.status = "WAITING_FOR_PAYMENT";
  return rental;
}

// Edit the status of an existing rental
function editStatus(rentalId, newStatus) {
  const rental = getById(rentalId);
  if (rental.status === newStatus || rental.status != "WAITING_FOR_PAYMENT") {
    throw new ClientError({
      statusCode: 400,
      code: "CLI_123",
      label: "Cannot change to this status",
    });
  }
  rental.status = newStatus;
  const newRental = updateItem(rentals, rentalId, rental);
  if (!newRental) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown rental",
    });
  }
  return newRental;
}

module.exports = {
  getAllPaged,
  addNew,
  editStatus,
};
