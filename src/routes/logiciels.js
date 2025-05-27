const express = require('express');
const router = express.Router();
const Parse = require('parse/node');

// Page principale des logiciels
router.get('/', (req, res) => {
  res.render('logiciels/index', {
    title: 'Nos Logiciels',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Liste des logiciels
router.get('/liste', async (req, res) => {
  try {
    // Récupérer les logiciels depuis Back4App
    const Software = Parse.Object.extend('Software');
    const query = new Parse.Query(Software);
    query.descending('createdAt');
    
    const softwares = await query.find();
    
    res.render('logiciels/liste', {
      title: 'Liste des Logiciels',
      softwares,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Erreur lors du chargement des logiciels');
    res.redirect('/logiciels');
  }
});

// Détail d'un logiciel
router.get('/:id', async (req, res) => {
  try {
    const softwareId = req.params.id;
    const Software = Parse.Object.extend('Software');
    const query = new Parse.Query(Software);
    
    const software = await query.get(softwareId);
    
    res.render('logiciels/detail', {
      title: software.get('title'),
      software,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Logiciel non trouvé');
    res.redirect('/logiciels/liste');
  }
});

// Téléchargement d'un logiciel
router.get('/:id/download', async (req, res) => {
  try {
    const softwareId = req.params.id;
    const Software = Parse.Object.extend('Software');
    const query = new Parse.Query(Software);
    
    const software = await query.get(softwareId);
    const downloadUrl = software.get('downloadUrl');
    
    // Incrémenter le compteur de téléchargements
    software.increment('downloads');
    await software.save();
    
    // Rediriger vers l'URL de téléchargement
    res.redirect(downloadUrl);
  } catch (error) {
    req.flash('error_msg', 'Erreur lors du téléchargement');
    res.redirect('/logiciels/liste');
  }
});

module.exports = router;
