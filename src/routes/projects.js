const express = require('express');
const router = express.Router();
const Parse = require('parse/node');
const authMiddleware = require('../middlewares/auth');

// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Vous devez être connecté pour accéder à cette page');
  res.redirect('/auth/login');
};

// Liste des projets
router.get('/', async (req, res) => {
  try {
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.include('author');
    query.descending('createdAt');
    
    const projects = await query.find();
    
    res.render('projects/index', {
      title: 'Projets',
      projects,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Erreur lors du chargement des projets');
    res.redirect('/');
  }
});

// Détail d'un projet
router.get('/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.include('author');
    
    const project = await query.get(projectId);
    
    // Récupérer les commentaires
    const Comment = Parse.Object.extend('Comment');
    const commentQuery = new Parse.Query(Comment);
    commentQuery.equalTo('project', project);
    commentQuery.include('author');
    commentQuery.ascending('createdAt');
    
    const comments = await commentQuery.find();
    
    res.render('projects/detail', {
      title: project.get('title'),
      project,
      comments,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Projet non trouvé');
    res.redirect('/projects');
  }
});

// Formulaire de création de projet
router.get('/new', isAuthenticated, (req, res) => {
  res.render('projects/form', {
    title: 'Nouveau Projet',
    project: null,
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Soumission du formulaire de création de projet
router.post('/new', isAuthenticated, async (req, res) => {
  try {
    const { title, description, content, category, tags } = req.body;
    
    // Validation des données
    if (!title || !description || !content || !category) {
      req.flash('error_msg', 'Veuillez remplir tous les champs obligatoires');
      return res.redirect('/projects/new');
    }
    
    // Création du projet
    const Project = Parse.Object.extend('Project');
    const project = new Project();
    
    // Récupérer l'utilisateur actuel
    const currentUser = await Parse.User.current();
    
    project.set('title', title);
    project.set('description', description);
    project.set('content', content);
    project.set('category', category);
    project.set('tags', tags.split(',').map(tag => tag.trim()));
    project.set('author', currentUser);
    
    await project.save();
    
    req.flash('success_msg', 'Projet créé avec succès');
    res.redirect(`/projects/${project.id}`);
  } catch (error) {
    req.flash('error_msg', 'Erreur lors de la création du projet');
    res.redirect('/projects/new');
  }
});

// Édition d'un projet
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const projectId = req.params.id;
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    
    const project = await query.get(projectId);
    
    // Vérifier si l'utilisateur est l'auteur du projet
    if (project.get('author').id !== req.session.user.id) {
      req.flash('error_msg', 'Vous n\'êtes pas autorisé à modifier ce projet');
      return res.redirect(`/projects/${projectId}`);
    }
    
    res.render('projects/form', {
      title: 'Modifier le Projet',
      project,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Projet non trouvé');
    res.redirect('/projects');
  }
});

// Mise à jour d'un projet
router.post('/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description, content, category, tags } = req.body;
    
    // Validation des données
    if (!title || !description || !content || !category) {
      req.flash('error_msg', 'Veuillez remplir tous les champs obligatoires');
      return res.redirect(`/projects/${projectId}/edit`);
    }
    
    // Récupérer le projet
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    const project = await query.get(projectId);
    
    // Vérifier si l'utilisateur est l'auteur du projet
    if (project.get('author').id !== req.session.user.id) {
      req.flash('error_msg', 'Vous n\'êtes pas autorisé à modifier ce projet');
      return res.redirect(`/projects/${projectId}`);
    }
    
    // Mettre à jour le projet
    project.set('title', title);
    project.set('description', description);
    project.set('content', content);
    project.set('category', category);
    project.set('tags', tags.split(',').map(tag => tag.trim()));
    
    await project.save();
    
    req.flash('success_msg', 'Projet mis à jour avec succès');
    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    req.flash('error_msg', 'Erreur lors de la mise à jour du projet');
    res.redirect(`/projects/${req.params.id}/edit`);
  }
});

// Suppression d'un projet
router.post('/:id/delete', isAuthenticated, async (req, res) => {
  try {
    const projectId = req.params.id;
    
    // Récupérer le projet
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    const project = await query.get(projectId);
    
    // Vérifier si l'utilisateur est l'auteur du projet
    if (project.get('author').id !== req.session.user.id) {
      req.flash('error_msg', 'Vous n\'êtes pas autorisé à supprimer ce projet');
      return res.redirect(`/projects/${projectId}`);
    }
    
    // Supprimer le projet
    await project.destroy();
    
    req.flash('success_msg', 'Projet supprimé avec succès');
    res.redirect('/projects');
  } catch (error) {
    req.flash('error_msg', 'Erreur lors de la suppression du projet');
    res.redirect(`/projects/${req.params.id}`);
  }
});

module.exports = router;
