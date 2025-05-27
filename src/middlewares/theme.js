// Middleware pour gérer les thèmes
const themeMiddleware = (req, res, next) => {
  // Définir le thème par défaut
  if (!req.session.theme) {
    req.session.theme = 'blue-dark';
  }
  
  // Rendre le thème disponible pour toutes les vues
  res.locals.currentTheme = req.session.theme;
  
  next();
};

module.exports = {
  themeMiddleware
};
