const express = require('express');
const router = express.Router();
const Parse = require('parse/node');

// Page principale des jeux
router.get('/', (req, res) => {
  res.render('jeux/index', {
    title: 'Nos Jeux',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Liste des jeux
router.get('/liste', async (req, res) => {
  try {
    // Récupérer les jeux depuis Back4App
    const Game = Parse.Object.extend('Game');
    const query = new Parse.Query(Game);
    query.descending('createdAt');
    
    const games = await query.find();
    
    res.render('jeux/liste', {
      title: 'Liste des Jeux',
      games,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Erreur lors du chargement des jeux');
    res.redirect('/jeux');
  }
});

// Détail d'un jeu
router.get('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const Game = Parse.Object.extend('Game');
    const query = new Parse.Query(Game);
    
    const game = await query.get(gameId);
    
    res.render('jeux/detail', {
      title: game.get('title'),
      game,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Jeu non trouvé');
    res.redirect('/jeux/liste');
  }
});

// Téléchargement d'un jeu
router.get('/:id/download', async (req, res) => {
  try {
    const gameId = req.params.id;
    const Game = Parse.Object.extend('Game');
    const query = new Parse.Query(Game);
    
    const game = await query.get(gameId);
    const downloadUrl = game.get('downloadUrl');
    
    // Incrémenter le compteur de téléchargements
    game.increment('downloads');
    await game.save();
    
    // Rediriger vers l'URL de téléchargement
    res.redirect(downloadUrl);
  } catch (error) {
    req.flash('error_msg', 'Erreur lors du téléchargement');
    res.redirect('/jeux/liste');
  }
});

module.exports = router;
