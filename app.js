var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('./session');//elliot
var app = express();
app.use(session.init());//elliot

//&
/*var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);*/




const bodyParser = require('body-parser');
// const sessions = require('express-session');


// les routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var offreRouter = require('./routes/offre');
var pieceRouter = require('./routes/piece');
var organisationRouter= require('./routes/organisation');
var fiche_posteRouter = require ('./routes/fiche_poste');
var candidatureRouter=require ('./routes/candidature');
var demande_joindre_orgRouter=require('./routes/demande_joindre_org');
//var apiRouter = require('./routes/api');// a voir  de elliott


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());// cookie parser middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// element ajouter apres avoir vu le tuto sur git=&
//en lien avec la session
/*app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));

*/




//app.use('/api', apiRouter);//elliott
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/offre', offreRouter);
app.use('/piece',pieceRouter);
app.use('/organisation',organisationRouter);
app.use('/fiche_poste',fiche_posteRouter);
app.use('/candidature',candidatureRouter);
app.use('/demande_joindre_org',demande_joindre_orgRouter);

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

// je travaille sur cette partie
// check user
/*app.all("*", function (req, res, next) {
  const nonSecurePaths = ["/signin", "/signup","/users/candidat", "/users" ]; //list des urls "all"
  const adminPaths = ["/users/userslist","/users/organisationlist"]; //list des urls admin
  const recruPaths = ["/users/ajoutOrg"," /users/recruteur","/users/offrelist","/users/ajoutOffre"]; //list des urls recruteur
 
  if (nonSecurePaths.includes(req.path)) return next();

  //authenticate user
  if ( adminPaths.includes(req.path)) {
    if (session.isConnected(req.session, "admin")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  } else {
    if ( recruPaths.includes(req.path)){
      if (session.isConnected(req.session, "recruteur")) return next();
      else res.status(403).render("error", { message: " Unauthorized access", error: {} });
    }
    else if (session.isConnected(req.session)) return next();
        // non authentifié
        else res.redirect("/signin");
  }
});
module.exports = app;

*/


// check user
app.all("*", function (req, res, next) {
  const nonSecurePaths = ["/signin", "/signup","/users/candidat","users/moncompte" ]; //list des urls "all"
  const adminPaths = ["/users/userslist", "users/admin","/users/organisationlist","/users/organisationlist"
  ]; //list des urls admin
  const recruPaths = ["/users/recruteur", "/users/offrelist","/users/offres","/users/piecelist",
  "/users/ajoutOffre","/users/fiche_postelist", "/users/ajoutFiche_poste"]; //list des urls recruteur
 
  if (nonSecurePaths.includes(req.path)) return next();

  //authenticate user
  if ( adminPaths.includes(req.path)) {
    if (session.isConnected(req.session, "admin")) return next();
    else res.status(403).render("error", { message: " Vous n'avez pas les autorisations =)", error: {} });
  } else {
    if ( recruPaths.includes(req.path)){
      if (session.isConnected(req.session, "recruteur")) return next();
      else res.status(403).render("error", { message: " Unauthorized access", error: {} });
    }
    else if (session.isConnected(req.session)) return next();
        // non authentifié
        else res.redirect("/signin");
  }
});



module.exports = app;















// à modifier
// check user
/*



app.all("*", function (req, res, next) {
  const nonSecurePaths = ["/signin", "/signup"];
  const adminPaths = ["/users/userslist"]; //list des urls admin
  if (nonSecurePaths.includes(req.path)) return next();

  //authenticate user
  if ( adminPaths.includes(req.path)) {
    if (session.isConnected(req.session, "admin")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  } else {
    if (session.isConnected(req.session)) return next();
    // non authentifié
    else res.redirect("/signin");
  }
});




*/



/*
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'je participe au TD de SR10 en P2023',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*5 } // 5 minutes
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/api', apiRouter);

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


*/




/*


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});



*/
