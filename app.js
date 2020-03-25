var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');
// var db = require('./db');

// const jsonErrorHandler = async (err, req, res, next) => {
//   res.status(500).send({ error: err });
// }

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (err, req, res, next) {
//   db.connect((err) => {
//     if(err)
//       next(err);
//     else
//       next();
//   });  
// });
app.use('/', indexRouter);
app.use('/game', gameRouter);

// app.use(jsonErrorHandler);

module.exports = app;
