const sequelize = require('./src/config/database');
const User = require('./src/model/User');
const Employees = require('./src/model/Employees');
const app = require('./src');

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

app.listen(3000, () => {
  console.log('app is running');
});
