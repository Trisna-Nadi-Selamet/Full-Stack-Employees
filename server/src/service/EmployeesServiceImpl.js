const pagination = require('../helper/Pagination');
const Employees = require('../model/Employees');
const User = require('../model/User');

const getEmployees = async (pagination) => {
  const { page, size } = pagination;
  const employe = await Employees.findAndCountAll({
    limit: size,
    offset: page * size,
    include: [
      {
        model: User,
        as: 'user',
      },
    ],
  });
  return {
    content: employe.rows,
    totalpage: Math.ceil(employe.count / size),
  };
};
module.exports = {
  getEmployees,
};
