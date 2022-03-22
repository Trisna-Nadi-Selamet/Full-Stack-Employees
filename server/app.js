const express = require('express');
const sequelize = require('./src/model/database'); //import db
const User = require('./src/model/User');
const Employees = require('./src/model/Employees');
const thisRunRequest = require('./src/logs/LoggerRequest');
const pagination = require('./src/helper/pagination');
//middleware
const idNumber = require('./src/middleware/idNumber');
const UserRouter = require('./src/router/userRouter');
const EmployeesRouter = require('./src/router/employeesRouter');

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('app is running');
}); //port server

sequelize.sync({ force: true }).then(async () => {
  for (let i = 1; i <= 5; i++) {
    const user = {
      username: `user${i}`,
      password: `1234`,
    };
    await User.create(user);
    const employees = {
      name: `user${i}`,
      section: `staff`,
      address: `jakarta`,
      //userId: `user${i}`,
    };
    await Employees.create(employees);
  }
}); //check database

app.use(thisRunRequest);

app.use(UserRouter);
app.use(EmployeesRouter);

//handling function
app.use((err, req, res, next) => {
  return res.status(err.status).send({
    status: err.status,
    errmessage: err.errmessage,
    message: err.message,
    timestamp: Date.now(),
    path: req.originalUrl,
  });
});
