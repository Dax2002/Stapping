var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { hostname } = require('os');



// view engine setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto su porta ${PORT}`);
});




const pgp = require('pg-promise')(/* initialization options */);

const db = pgp({
      connectionString: 'postgresql://dario:g6XQYGJnC4a19ArO46KqBZ5IyQviNXN5@dpg-d0cs0d6mcj7s73at6pc0-a.frankfurt-postgres.render.com/stappingdb',
      ssl: { rejectUnauthorized: false } // Render richiede SSL
});

// select and return a single user name from id:
db.one('SELECT nome FROM utenti WHERE id = $1', [1])
    .then(utenti => {
        console.log(utenti.nome); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    });


app.post('/esegui-funzione', (req, res) => {
  console.log('Funzione eseguita dal backend!');
  res.send('Funzione eseguita con successo!');
});