const express = require('express');
const path = require('path');
const morgan = require('morgan'); // shows response in terminal
var cors = require('cors')
const app = express();

const { mongoose } = require('./database');

// Settings (Config)
app.set('port', process.env.PORT || 5000); // use OS port or 3000

// Middlewares (Functions before reaching routes URLS)
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', require('./routes/task.routes.js'));

// Static Files
app.use(express.static(path.join(__dirname, './client/public')));

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
