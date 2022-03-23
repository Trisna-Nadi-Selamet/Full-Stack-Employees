const express = require('express');

const thisRunRequest = require('./logs/LoggerRequest');
const UserRouter = require('./router/userRouter');
const EmployeesRouter = require('./router/employeesRouter');
const ErrorHandler = require('./helper/ErrorHandler');

const app = express();
app.use(express.json());

app.use(thisRunRequest);
app.use(UserRouter);
app.use(EmployeesRouter);
app.use(ErrorHandler);

module.exports = app;
