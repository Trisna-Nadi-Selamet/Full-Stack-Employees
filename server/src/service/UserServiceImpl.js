const idNumber = require('../middleware/idNumber');
const User = require('../model/User');
const NotFoundException = require('../helper/NotFoundException');
const InvailidIdException = require('../helper/InvailidIdException');

const create = async (user) => {
  await User.create(user);
};

const getUser = async (pagination) => {
  const { page, size } = pagination;
  //const users = await User.findAll(); //get all data
  const users = await User.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  //  res.send(users);
  return {
    content: users.rows,
    totalpage: Math.ceil(users.count / size),
  };
};

const getUserId = async (id) => {
  const users = await User.findOne({ where: { id: id } });
  if (!users) {
    throw new NotFoundException();
  }
  return users;
};

const updateUser = async (id, body) => {
  const users = await User.findOne({ where: { id: id } });
  users.username = body.username;
  await users.save();
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};

module.exports = {
  create,
  getUser,
  getUserId,
  updateUser,
  deleteUser,
  findByEmail,
};
