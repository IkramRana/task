var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
var appRoutes = require('./src/routes/app.route');

mongoose.connect('mongodb+srv://task:task123@cluster0.0lukd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
})
  .then(async res => {
    console.log("DB Connected Successfully")
  })
  .catch(err => {
    console.log('err', err);
    console.log('Unable to connect with DB')
  })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.options('*', cors());

app.use('/api', appRoutes);

app.get('/*', function (req, res) {
  return res.status(500).json({ message: 'Invalid path' });
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

module.exports = app;
