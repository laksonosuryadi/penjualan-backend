var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const db_config = {
   production:`mongodb://laksono:tung101225@cluster0-shard-00-00-hrzhs.mongodb.net:27017,cluster0-shard-00-01-hrzhs.mongodb.net:27017,cluster0-shard-00-02-hrzhs.mongodb.net:27017/penjualan-prod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`,
   development:`mongodb://laksono:tung101225@cluster0-shard-00-00-hrzhs.mongodb.net:27017,cluster0-shard-00-01-hrzhs.mongodb.net:27017,cluster0-shard-00-02-hrzhs.mongodb.net:27017/penjualan-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`
}

// mongoose
mongoose.connect(db_config[app.settings.env], (err,res) => {
  if(err) {
    console.log('Error connecting to the database. '+err);
  } else {
    console.log('connected to Database: '+app.settings.env);
  }
})
mongoose.connection.on('connected', () => {
  console.log('mongo is connected');
})

app.use('/', index);
app.use('/users', users);
app.use('/products', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
