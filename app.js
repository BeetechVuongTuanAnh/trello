const express = require('express');
const morgan = require('morgan');
const database = require('./Configs/Database');
const app = express();
const port = 5000;
const route = require('./Routes/api');


app.use(morgan('combined'));
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('*/uploads/users',express.static('public/uploads/users'));
app.use('*/uploads/tasks',express.static('public/uploads/tasks'));
app.use('*/uploads/comments',express.static('public/uploads/comments'));

database.connect();
route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})