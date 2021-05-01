const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const telephone = (value, helpers) => {
  if (value.length > 12) {
    return helpers.message('telephone must be at least 12 characters');
  }
  if (!value.match(/\d/i)) {
    return helpers.message('password must contain only numbers');
  }

  return value;
};

module.exports = {
  objectId,
  telephone,
};
