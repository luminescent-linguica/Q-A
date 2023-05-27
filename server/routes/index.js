require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const postgresqlRoutes = require('../routes/postgresqlRoute.js');
const pgdb = require('../db/postgresql.js');
const mgdb = require('../db/mongodb.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/qa', postgresqlRoutes);

module.exports = app;

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + process.env.PORT);