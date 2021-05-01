const httpStatus = require('http-status');
const { Department, ContactPerson } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createDepartment = async (userBody) => {
  const deptBody = { ...userBody };
  const contactPerson = await ContactPerson.create(deptBody.contactperson);
  deptBody.contactPerson = contactPerson._id;
  delete deptBody.contactperson;
  const dept = await Department.create(deptBody);
  return dept;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDepartments = async (filter, options) => {
  const departments = await Department.paginate(filter, options);
  return departments;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getDepartmentById = async (id) => {
  const dept = await Department.findById(id);
  if (dept) {
    const _dept = { ...dept.toJSON() };
    _dept.contactPerson = await ContactPerson.findById(dept.contactPerson);
    return _dept;
  }
  return null;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateDepartmentById = async (departmentId, updateBody) => {
  const department = await getDepartmentById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }

  Object.assign(department, updateBody);
  await department.save();
  return department;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteDepartmentById = async (departmentId) => {
  const department = await Department.findById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  const contactPerson = await ContactPerson.findById(department.contactPerson);
  await contactPerson.remove();
  const deptremoved = await department.remove();
  return deptremoved;
};

module.exports = {
  createDepartment,
  queryDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
