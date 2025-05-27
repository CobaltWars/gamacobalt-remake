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

// Page d'accueil GLDF
router.get('/', (req, res) => {
  res.render('gldf/index', {
    title: 'GLDF Communauté',
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Liste des projets communautaires
router.get('/projects', async (req, res) => {
  try {
    const Project = Parse.Object.extend('Project');
    const query = new Parse.Query(Project);
    query.include('author');
    query.descending('createdAt');
    query.limit(12);
    
    const projects = await query.find();
    
    res.render('gldf/projects', {
      title: 'Projets Communautaires',
      projects,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Erreur lors du chargement des projets');
    res.redirect('/gldf');
  }
});

// Page de détail d'un projet
router.get('/projects/:id', async (req, res) => {
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
    
    res.render('gldf/project-detail', {
      title: project.get('title'),
      project,
      comments,
      currentTheme: req.session.theme || 'blue-dark'
    });
  } catch (error) {
    req.flash('error_msg', 'Projet non trouvé');
    res.redirect('/gldf/projects');
  }
});

// Formulaire de création de projet
router.get('/projects/new', isAuthenticated, (req, res) => {
  res.render('gldf/project-form', {
    title: 'Nouveau Projet',
    project: null,
    currentTheme: req.session.theme || 'blue-dark'
  });
});

// Soumission du formulaire de création de projet
router.post('/projects/new', isAuthenticated, async (req, res) => {
  try {
    const { title, description, content, category, tags } = req.body;
    
    // Validation des données
    if (!title || !description || !content || !category) {
      req.flash('error_msg', 'Veuillez remplir tous les champs obligatoires');
      return res.redirect('/gldf/projects/new');
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
    res.redirect(`/gldf/projects/${project.id}`);
  } catch (error) {
    req.flash('error_msg', 'Erreur lors de la création du projet');
    res.redirect('/gldf/projects/new');
  }
});

// Ajout d'un commentaire
router.post('/projects/:id/comment', isAuthenticated, async (req, res) => {
  try {
    const projectId = req.params.id;
    const { content } = req.body;
    
    if (!content) {
      req.flash('error_msg', 'Le commentaire ne peut pas être vide');
      return res.redirect(`/gldf/projects/${projectId}`);
    }
    
    // Récupérer le projet
    const Project = Parse.Object.extend('Project');
    const projectQuery = new Parse.Query(Project);
    const project = await projectQuery.get(projectId);
    
    // Récupérer l'utilisateur actuel
    const currentUser = await Parse.User.current();
    
    // Créer le commentaire
    const Comment = Parse.Object.extend('Comment');
    const comment = new Comment();
    
    comment.set('content', content);
    comment.set('author', currentUser);
    comment.set('project', project);
    
    await comment.save();
    
    req.flash('success_msg', 'Commentaire ajouté');
    res.redirect(`/gldf/projects/${projectId}`);
  } catch (error) {
    req.flash('error_msg', 'Erreur lors de l\'ajout du commentaire');
    res.redirect(`/gldf/projects/${req.params.id}`);
  }
});

module.exports = router;
