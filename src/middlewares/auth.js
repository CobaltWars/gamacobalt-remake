const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Vous devez être connecté pour accéder à cette page');
  res.redirect('/auth/login');
};

module.exports = {
  isAuthenticated
};
