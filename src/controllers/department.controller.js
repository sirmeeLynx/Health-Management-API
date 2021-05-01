const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

const createDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

const getDepartments = catchAsync(async (req, res) => {
  const result = await departmentService.queryDepartments({}, {});
  res.send(result);
});

const getDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'department not found');
  }
  res.send(department);
});

const updateDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.updateDepartmentById(req.params.departmentId, req.body);
  res.send(department);
});

const deleteDepartment = catchAsync(async (req, res) => {
  await departmentService.deleteDepartmentById(req.params.departmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchDepartments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await departmentService.queryDepartments(filter, options);
  res.send(result);
});

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  searchDepartments,
};
