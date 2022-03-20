const express = require('express');
const sequelize = require('./database'); //import db
//const User = require('./User'); //import name class database
const User = require('./User');

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('app is running');
}); //port server

sequelize.sync({ force: true }).then(async () => {
  for (let i = 1; i <= 25; i++) {
    const user = {
      username: `user${i}`,
      password: `1234`,
    };
    await User.create(user);
  }
}); //check database

//end point post insert data
app.post('/users', (req, res) => {
  User.create(req.body).then(() => {
    res.send('user in insered');
  });
});

//end point get all data and find countAll
app.get('/users', async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;

  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;

  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  //const users = await User.findAll(); //get all data
  const users = await User.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  //  res.send(users);
  res.send({
    content: users.rows,
    totalpage: Math.ceil(users.count / size),
  });
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
