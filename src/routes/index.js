const express = require('express');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Accueil',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Gestion du thème
router.post('/set-theme', (req, res) => {
  const { theme } = req.body;
  
  // Valider le thème
  const validThemes = ['blue-dark', 'dark', 'blue-white', 'white'];
  if (!validThemes.includes(theme)) {
    return res.status(400).json({ error: 'Thème invalide' });
  }
  
  // Enregistrer le thème dans la session
  req.session.theme = theme;
  
  // Si l'utilisateur est connecté, enregistrer sa préférence
  if (req.session.user) {
    const Parse = require('parse/node');
    const query = new Parse.Query(Parse.User);
    
    query.get(req.session.user.id)
      .then(user => {
        user.set('theme', theme);
        return user.save();
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde du thème:', error);
      });
  }
  
  res.json({ success: true, theme });
});

// Page À propos
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'À propos',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Page Contact
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Page Confidentialité
router.get('/privacy', (req, res) => {
  res.render('privacy', {
    title: 'Politique de confidentialité',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

module.exports = router;
