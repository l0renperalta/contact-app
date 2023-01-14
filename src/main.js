const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const { database } = require('./key');

const app = express();

// Settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
   '.hbs',
   engine({
      defaultLayout: 'main',
      layoutsDir: path.join(app.get('views'), 'layouts'),
      partialsDir: path.join(app.get('views'), 'partials'),
      helpers: require('./lib/handlebars'),
      extname: '.hbs',
   })
);
app.set('view engine', 'hbs');

// Middlewares
app.use(
   session({
      secret: 'laughin waffle',
      resave: false,
      saveUninitialized: false,
      store: new mysqlStore(database),
   })
);
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global variables
app.use((req, res, next) => {
   app.locals.success = req.flash('success');
   next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), () => console.log(`Server listen on port ${app.get('port')}`));
