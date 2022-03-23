const router = require('express').Router();
const NotFoundException = require('../helper/NotFoundException');
const pagination = require('../helper/Pagination');
const idNumber = require('../middleware/idNumber');
const Employees = require('../model/Employees');
const EmployeesServiceImpl = require('../service/EmployeesServiceImpl');

router.get('/employees', pagination, async (req, res) => {
  const page = await EmployeesServiceImpl.getEmployees(req.pagination);
  res.send(page);
});

module.exports = router;
