const guestsMock = require("../mocks/guests.json");
const {
  getPage,
  findItemById,
  ClientError,
  addItem,
  updateItem,
  removeItem,
} = require("../helpers");

// In memory guests
const guests = [...guestsMock];

// Get all guests
function getAllPaged(queryParams) {
  return getPage(guests, queryParams);
}

// Get a guest by id
function getById(guestId) {
  const guest = findItemById(guests, guestId);
  if (!guest) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown guest",
    });
  }
  return guest;
}

// Add a new guest
function addNew(newGuest) {
  const guest = addItem(guests, newGuest);
  return guest;
}

// Update an existing guest
function updateGuest(guestId, newGuest) {
  const guest = updateItem(guests, guestId, newGuest);
  if (!guest) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown guest",
    });
  }
  return guest;
}

// Delete an existing guest
function deleteGuest(guestId) {
  if (!getById(guestId)) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown guest",
    });
  }
  removeItem(guests, guestId);
}

module.exports = {
  getAllPaged,
  getById,
  addNew,
  updateGuest,
  deleteGuest,
};
