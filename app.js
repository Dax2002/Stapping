var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { hostname } = require('os');



// view engine setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// Serve la cartella html_views
app.use(express.static(path.join(__dirname, 'html_views')));




// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html_views/index.html'));
});



//Inizio funzioni JS Server side---------------
const pgp = require('pg-promise')(/* initialization options */);

const db = pgp({
      connectionString: 'postgresql://dario:g6XQYGJnC4a19ArO46KqBZ5IyQviNXN5@dpg-d0cs0d6mcj7s73at6pc0-a.frankfurt-postgres.render.com/stappingdb',
      ssl: { rejectUnauthorized: false } // Render richiede SSL
});

app.post('/esegui-query', async (req, res) => {
  try {
    console.log('POST /esegui-query ricevuto');
    db.many('SELECT * FROM stappers')
    .then(stappers => {
        console.log(stappers);
        console.log(stappers.length);
        res.json(stappers);
    })
    .catch(error => {
        console.log(error); 
    });
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nella query' });
  }
});

  
app.post('/query-inserimento', async (req, res) => {
  try {
    console.log('POST /query-inserimento ricevuto');


    var nome = req.body.nome;
    var goduria = req.body.goduria;
    var reperibilita = req.body.reperibilita;
    var stappatore = req.body.stappatore;
    console.log({ nome, goduria, reperibilita, stappatore });

    db.one("INSERT INTO stappers (nome,goduria,reperibilita,stappatore) VALUES ('"+ nome + "'," +goduria+","+reperibilita+",'"+stappatore+"') RETURNING id")
    .then(stappers => {
        res.json({ success: true });
    })
    .catch(error => {
        console.log(error); 
    });
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore nella query' });
  }
});




//Fine funzioni JS Server side---------------











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

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
//  console.log(`Server in ascolto su porta ${PORT}`);
//});



    


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

    
