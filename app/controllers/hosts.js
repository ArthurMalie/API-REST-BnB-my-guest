const hostService = require("../services/hosts");

// Get all hosts
function getAll(req, res) {
  res.status(200).send(hostService.getAllPaged(req.query));
}

// Get a hosts by id
function getById(req, res) {
  res.status(200).send(hostService.getById(req.params.hostId));
}

// Add a new host
function addNew(req, res) {
  res.status(200).send(hostService.addNew(req.body));
}

// Update an existing host
function updateHost(req, res) {
  res.status(200).send(hostService.updateHost(req.params.hostId, req.body));
}

// Delete an existing host
function deleteHost(req, res) {
  res.status(204).send(hostService.deleteHost(req.params.hostId));
}

module.exports = {
  getAll,
  getById,
  addNew,
  updateHost,
  deleteHost,
};
