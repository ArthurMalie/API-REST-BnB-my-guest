const { randomUuid } = require("./uuid");

const PER_PAGE_MAX = 100;

/**
 * Add item to array.
 * @param {*} array
 * @param {*} item
 */
function addItem(array, item) {
  item.id = randomUuid();
  array.push(item);
  return item;
}

/**
 * Find an item by id.
 * @param {*} array
 * @param {*} id
 */
function findItemById(array, id) {
  const item = array.find((item) => item.id === id);
  if (!item) {
    return undefined;
  }

  // Return a copy to the item (to avoid mutations)
  return { ...item };
}

/**
 * Update an item.
 * @param {*} array
 * @param {*} itemId
 * @param {*} itemUpdated
 */
function updateItem(array, itemId, itemUpdated) {
  const itemToUpdate = findItemById(array, itemId);
  const itemToUpdateIndex = array.findIndex((item) => item.id === itemId);

  if (itemToUpdate) {
    // Preserve original id
    itemUpdated.id = itemToUpdate.id;
    array.splice(itemToUpdateIndex, 1, itemUpdated);
  }
  return itemUpdated;
}

/**
 * Remove an item by id.
 * @param {*} array
 * @param {*} itemId
 */
function removeItem(array, itemId) {
  const itemIndex = array.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    array.splice(itemIndex, 1);
  }
}

/**
 * Filter an array.
 * @param {*} array
 * @param {*} filters
 */
function filterArray(array = [], filters = {}) {
  return array.filter((item) => {
    let match = true;
    Object.keys(filters).forEach((filterProp) => {
      const itemValue = item[filterProp];
      if (itemValue && itemValue.toString() === filters[filterProp]) {
        match &= true;
      } else {
        match = false;
      }
    });
    return match;
  });
}

/**
 * Return a page of an array.
 * @param {*} array
 * @param {*} queryParams
 */
function getPage(array, queryParams) {
  // Compute default page properties
  const { page = 1, perPage = 10, ...filters } = queryParams;
  const perPageComputed = Math.min(perPage, PER_PAGE_MAX);

  // Filter array based on properties
  const filteredArray = filterArray(array, filters);

  // Return matching page
  return {
    page,
    perPage: perPageComputed,
    totalPages: Math.max(Math.ceil(filteredArray.length / perPageComputed), 1),
    totalItems: filteredArray.length,
    items: filteredArray.slice(
      (page - 1) * perPageComputed,
      page * perPageComputed
    ),
  };
}

module.exports = {
  addItem,
  findItemById,
  updateItem,
  removeItem,
  getPage,
};
