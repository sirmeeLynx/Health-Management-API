const Joi = require('joi');
const { objectId, telephone } = require('./custom.validation');

const _metaObject = Joi.array()
  .optional()
  .items(
    Joi.object({
      key: Joi.string().required(),
      value: Joi.string().required(),
    })
  );

const _contactPerson = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  telephone: Joi.string().required().custom(telephone),
  metadata: _metaObject,
});

const _department = Joi.object().keys({
  name: Joi.string().required(),
  apikey: Joi.string().required(),
  contactperson: _contactPerson,
  metadata: _metaObject,
});

const createDepartment = {
  body: _department,
};

const getDepartments = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getDepartment = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateDepartment = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: _department.min(1),
};

const deleteDepartment = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
