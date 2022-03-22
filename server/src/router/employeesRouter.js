const express = require('express');
const router = express.Router();

const NotFoundException = require('../helper/NotFoundException');
const pagination = require('../helper/pagination');
const idNumber = require('../middleware/idNumber');
const Employees = require('../model/Employees');

router.post('/employees', (req, res) => {
  try {
    Employees.create(req.body).then(() => {
      res.send('user in insered');
    });
  } catch (error) {
    res.send(error);
  }
});

router.get('/employees', pagination, async (req, res) => {
  const { page, size } = req.pagination;
  const employe = await Employees.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.send({
    content: employe.rows,
    totalpage: Math.ceil(employe.count / size),
  });
});

router.get('/employees/:id', idNumber, async (req, res, next) => {
  const id = req.params.id;
  const employe = await Employees.findOne({ where: { id: id } });
  if (!employe) {
    next(new NotFoundException());
  }
  res.send(employe);
});

router.put('/employees/:id', idNumber, async (req, res) => {
  const id = req.params.id;
  const employe = await Employees.findOne({ where: { id: id } });
  employe.name = req.body.name;
  await employe.save();
  res.send('update');
});

module.exports = router;
