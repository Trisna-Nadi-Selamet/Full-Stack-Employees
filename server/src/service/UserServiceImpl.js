const idNumber = require('../middleware/idNumber');
const User = require('../model/User');
const NotFoundException = require('../helper/NotFoundException');
const InvailidIdException = require('../helper/InvailidIdException');

const bcrypt = require('bcrypt');

const create = async (body) => {
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });
  //await User.create(body);
};

const getUser = async (pagination) => {
  const { page, size } = pagination;
  //const users = await User.findAll(); //get all data
  const users = await User.findAndCountAll({
    limit: size,
    offset: page * size,
    attributes: ['id', 'username', 'email'],
  });
  //  res.send(users);
  return {
    content: users.rows.map((users) => {
      const userJSON = users.get();
      delete userJSON.password;
      console.log(`ResponseData :`, userJSON);
      return userJSON;
    }),
    totalpage: Math.ceil(users.count / size),
  };
};

const getUserId = async (id) => {
  const users = await User.findOne({
    where: { id: id },
    attributes: ['id', 'username', 'email'],
  });
  //const userJSON = users.get();
  //console.log(userJSON);
  //delete userJSON.password;
  //return users;
  // console.log(`ResponseData :`, userJSON);
  // return userJSON;
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
