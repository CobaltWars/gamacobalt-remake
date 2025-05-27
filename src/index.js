require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const Parse = require('parse/node');

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de Parse (Back4App)
Parse.initialize(
  process.env.PARSE_APP_ID || 'your_app_id',
  process.env.PARSE_JS_KEY || 'your_javascript_key'
);
Parse.serverURL = process.env.PARSE_SERVER_URL || 'https://parseapi.back4app.com/';

// Configuration des middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET || 'gamacobalt_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Configuration de flash pour les messages
app.use(flash());

// Middleware pour les variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.session.user || null;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const jeuxRoutes = require('./routes/jeux');
const logicielsRoutes = require('./routes/logiciels');
const gldfRoutes = require('./routes/gldf');
const projectsRoutes = require('./routes/projects');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/jeux', jeuxRoutes);
app.use('/logiciels', logicielsRoutes);
app.use('/gldf', gldfRoutes);
app.use('/projects', projectsRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page non trouvée',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
