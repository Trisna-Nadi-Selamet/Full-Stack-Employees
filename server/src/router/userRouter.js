const express = require('express');
const router = express.Router();
const pagination = require('../helper/pagination');
const idNumber = require('../middleware/idNumber');

const User = require('../model/User');
const UserServiceImpl = require('../service/UserServiceImpl');

//end point post insert data
router.post('/users', async (req, res) => {
  try {
    await UserServiceImpl.create(req.body);
    res.send('Success');
  } catch (error) {
    res.send(error);
  }
});

//end point get all data and find countAll
router.get('/users', pagination, async (req, res) => {
  try {
    const page = await UserServiceImpl.getUser(req.pagination);
    res.send(page);
  } catch (error) {
    res.send(error);
  }
});

//end point get :id with middleware
router.get('/users/:id', idNumber, async (req, res, next) => {
  try {
    const users = await UserServiceImpl.getUserId(req.params.id);
    res.send(users);
  } catch (err) {
    next(err);
  }

  //const id = req.params.id;
  //not midleware
  //const requestId = Number.parseInt(req.params.id);
  //if (Number.isNaN(requestId)) {
  // next(new InvailidIdException());
  // return res.status(400).send({
  //   status: 400,
  //   errmessage: 'invailid ID',
  //   message: 'Missing parameter(s)!',
  // });
  //}
  //   const users = await User.findOne({ where: { id: id } });
  //   if (!users) {
  //     next(new NotFoundException());
  //   }
  //   res.send(users);
});

//end point update data
router.put('/users/:id', idNumber, async (req, res) => {
  try {
    await UserServiceImpl.updateUser(req.params.id, req.body);
    res.send('Update Done');
  } catch (error) {
    res.send(err);
  }
});

//end point delete data
router.delete('/users/:id', idNumber, async (req, res) => {
  await UserServiceImpl.deleteUser(req.params.id);
  //await User.destroy({ where: { id: id } });
  res.send('Removed Done');
});

module.exports = router;
