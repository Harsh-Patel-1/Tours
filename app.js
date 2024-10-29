/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
// 1) Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) routes

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
// 4) start server

module.exports = app;
