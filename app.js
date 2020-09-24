var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Pusher = require('pusher');
var Ably = require('ably');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

let counter = 1;
const ids = [
  '5e0e7faefdddfff5b48b45eA',
  '5e0e7faefdddfff5b48b45eB',
  '5e0e7faefdddfff5b48b45eC',
  '5e0e7faefdddfff5b48b45eD',
  '5e0e7faefdddfff5b48b45eE',
  '5e0e7faefdddfff5b48b45eF',
  '5e0e7faefdddfff5b48b45eG',
  '5e0e7faefdddfff5b48b45eH',
  '5e0e7faefdddfff5b48b45eI',
  '5e0e7faefdddfff5b48b45eJ',
  '5e0e7faefdddfff5b48b45eK',
  'fake'
];

//*******************************************************//
//************************ Pusher ***********************//
//*******************************************************//
// var pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_API_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: 'eu',
//   encrypted: true
// });

// setInterval(() => {
//   pusher.trigger('test_em_portada_refresh', 'em_portada_refresh_event', { payload: [{
//     "id": ids[counter - 1],
//     "cintillo": "Noticia " + counter,
//     "titulo": "Lorem fistrum ahorarr a peich sexuarl me cago en tus muelas.",
//     "isPremium": counter % 2 === 0 ? true : false
//   }]});
//   if(counter < 12) counter++;
//   else counter = 1;
// }, 4 * 1000);
//*******************************************************//
//************************ Pusher ***********************//
//*******************************************************//

//*******************************************************//
//************************* Ably ************************//
//*******************************************************//
var ably = new Ably.Realtime(process.env.ABLY_API_KEY);
var channel = ably.channels.get('em_portada_refresh');

// Publish a message to the test channel
setInterval(() => {
  channel.publish('em_portada_refresh_event', { payload: [{
    "id": ids[counter - 1],
    "cintillo": "Noticia " + counter,
    "titulo": "Lorem fistrum ahorarr a peich sexuarl me cago en tus muelas...",
    "isPremium": counter % 2 === 0 ? true : false,
    "section": "ESPAÑA",
    "source": "JUANMA LAMET",
    "url": generateImagesUrls(counter),
    "largeImage": largeImage(counter),
    "timestamp": new Date()
  }] });
  if(counter < 12) counter++;
  else counter = 1;
}, 1 * 1000);
//*******************************************************//
//************************* Ably ************************//
//*******************************************************//

function generateImagesUrls(counter) {
    if(counter % 5 === 0) {
        return "https://res.cloudinary.com/dlmrvaeyh/image/upload/v1600704266/largeJs.svg";
    } else if(counter % 3 === 1) {
        return "adsasfa";
    } else if(counter % 4 === 1) {
        return "";
    } else {
        return "https://res.cloudinary.com/dlmrvaeyh/image/upload/v1588156326/marcomonzon/js-logo.svg";
    }
}

function largeImage(counter) {
    if(counter % 5 === 0) {
        return true;
    }
    return false;
}

module.exports = app;
