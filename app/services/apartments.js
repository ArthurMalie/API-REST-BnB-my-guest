const apartmentsMock = require("../mocks/apartments.json");
const {
  getPage,
  findItemById,
  ClientError,
  addItem,
  updateItem,
  removeItem,
} = require("../helpers");
const hostService = require("./hosts");
const cityService = require("./cities");

// In memory apartments
const apartments = [...apartmentsMock];

function getAllPaged(queryParams) {
  return getPage(apartments, queryParams);
}

// Get an apartment by id
function getById(apartmentId) {
  const apartment = findItemById(apartments, apartmentId);
  if (!apartment) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown apartment",
    });
  }
  return apartment;
}

// Add a new apartment
function addNew(newApartment) {
  // Check that host and city exist
  hostService.getById(newApartment.hostId);
  cityService.getById(newApartment.cityId);

  const apartment = addItem(apartments, newApartment);
  return apartment;
}

// Update an existing apartment
function updateApartment(apartmentId, newApartment) {
  // Check that host and city exist
  hostService.getById(newApartment.hostId);
  cityService.getById(newApartment.cityId);
  const apartment = updateItem(apartments, apartmentId, newApartment);
  if (!apartment) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown apartment",
    });
  }
  return apartment;
}

// Delete an existing apartment
function deleteApartment(apartmentId) {
  if (!getById(apartmentId)) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown apartment",
    });
  }
  removeItem(apartments, apartmentId);
}

module.exports = {
  getAllPaged,
  getById,
  addNew,
  updateApartment,
  deleteApartment,
};
