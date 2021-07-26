const hostsMock = require("../mocks/hosts.json");
const {
  getPage,
  findItemById,
  ClientError,
  addItem,
  updateItem,
  removeItem,
} = require("../helpers");

// In memory hosts
const hosts = [...hostsMock];

// Get all hosts
function getAllPaged(queryParams) {
  return getPage(hosts, queryParams);
}

// Get a host by id
function getById(hostId) {
  const host = findItemById(hosts, hostId);
  if (!host) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown host",
    });
  }
  return host;
}

// Add a new host
function addNew(newHost) {
  const host = addItem(hosts, newHost);
  return host;
}

// Update an existing host
function updateHost(hostId, newHost) {
  const host = updateItem(hosts, hostId, newHost);
  if (!host) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown host",
    });
  }
  return host;
}

// Delete an existing host
function deleteHost(hostId) {
  if (!getById(hostId)) {
    throw new ClientError({
      statusCode: 404,
      code: "CLI_123",
      label: "Unknown host",
    });
  }
  removeItem(hosts, hostId);
}

module.exports = {
  getAllPaged,
  getById,
  addNew,
  updateHost,
  deleteHost,
};
