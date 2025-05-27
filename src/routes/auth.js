const express = require('express');
const router = express.Router();
const Parse = require('parse/node');
const bcrypt = require('bcryptjs');

// Page de connexion
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('auth/login', {
    title: 'Connexion',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Traitement de la connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation des données
    if (!email || !password) {
      req.flash('error_msg', 'Veuillez remplir tous les champs');
      return res.redirect('/auth/login');
    }
    
    // Connexion avec Parse
    try {
      const user = await Parse.User.logIn(email, password);
      
      // Stocker les informations de l'utilisateur dans la session
      req.session.user = {
        id: user.id,
        username: user.get('username'),
        email: user.get('email'),
        avatar: user.get('avatar') || null
      };
      
      req.flash('success_msg', 'Connexion réussie');
      res.redirect('/');
    } catch (error) {
      req.flash('error_msg', 'Email ou mot de passe incorrect');
      res.redirect('/auth/login');
    }
  } catch (error) {
    req.flash('error_msg', 'Une erreur est survenue');
    res.redirect('/auth/login');
  }
});

// Page d'inscription
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('auth/register', {
    title: 'Inscription',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Traitement de l'inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;
    
    // Validation des données
    if (!username || !email || !password || !password2) {
      req.flash('error_msg', 'Veuillez remplir tous les champs');
      return res.redirect('/auth/register');
    }
    
    if (password !== password2) {
      req.flash('error_msg', 'Les mots de passe ne correspondent pas');
      return res.redirect('/auth/register');
    }
    
    if (password.length < 6) {
      req.flash('error_msg', 'Le mot de passe doit contenir au moins 6 caractères');
      return res.redirect('/auth/register');
    }
    
    // Vérifier si l'email existe déjà
    const query = new Parse.Query(Parse.User);
    query.equalTo('email', email);
    const existingUser = await query.first();
    
    if (existingUser) {
      req.flash('error_msg', 'Cet email est déjà utilisé');
      return res.redirect('/auth/register');
    }
    
    // Créer un nouvel utilisateur
    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);
    user.set('theme', 'blue-dark'); // Thème par défaut
    
    await user.signUp();
    
    req.flash('success_msg', 'Inscription réussie, vous pouvez maintenant vous connecter');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error_msg', 'Une erreur est survenue lors de l\'inscription');
    res.redirect('/auth/register');
  }
});

// Déconnexion
router.get('/logout', (req, res) => {
  Parse.User.logOut();
  req.session.destroy();
  res.redirect('/');
});

// Page de récupération de mot de passe
router.get('/forgot-password', (req, res) => {
  res.render('auth/forgot-password', {
    title: 'Mot de passe oublié',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Traitement de la récupération de mot de passe
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      req.flash('error_msg', 'Veuillez entrer votre adresse email');
      return res.redirect('/auth/forgot-password');
    }
    
    await Parse.User.requestPasswordReset(email);
    
    req.flash('success_msg', 'Un email de réinitialisation a été envoyé');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error_msg', 'Une erreur est survenue');
    res.redirect('/auth/forgot-password');
  }
});

module.exports = router;
