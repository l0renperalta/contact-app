const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

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
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global variables
// app.use((req, res, next) => {
//    next();
// });

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), () => console.log(`Server listen on port ${app.get('port')}`));
