const pagination = require('../helper/pagination');
const Employees = require('../model/Employees');
const getEmployees = async (pagination) => {
  const { page, size } = pagination;
  const employe = await Employees.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  return {
    content: employe.rows,
    totalpage: Math.ceil(employe.count / size),
  };
};
module.exports = {
  getEmployees,
};
