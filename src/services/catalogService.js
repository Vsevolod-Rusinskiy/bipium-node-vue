async function findCatalogIdByName(name, dataArray) {
  const foundObject = dataArray.find((obj) => obj.name === name);
  return foundObject ? foundObject.id : null;
}

module.exports = {
  findCatalogIdByName,
};
