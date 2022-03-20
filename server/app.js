const express = require('express');
const sequelize = require('./database'); //import db
//const User = require('./User'); //import name class database
const User = require('./User');

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('app is running');
}); //port server

sequelize.sync({ force: true }).then(() => console.log('database Ready')); //check database

//end point post insert data
app.post('/users', (req, res) => {
  User.create(req.body).then(() => {
    res.send('user in insered');
  });
});

//end point get all data
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

//end point get :id data
app.get('/users/:id', async (req, res) => {
  const requestId = req.params.id;
  const users = await User.findOne({ where: { id: requestId } });
  res.send(users);
});

//end point update data
app.put('/users/:id', async (req, res) => {
  const requestId = req.params.id;
  const users = await User.findOne({ where: { id: requestId } });
  users.username = req.body.username;
  await users.save();
  res.send('update');
});

//end point delete data
app.delete('/users/:id', async (req, res) => {
  const requestId = req.params.id;
  await User.destroy({ where: { id: requestId } });
  res.send('removed');
});
