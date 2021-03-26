// Connection to database

const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-todo';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) => console.log(`DB connected`))
  .catch((err) => console.log(err));

module.exports = mongoose;
