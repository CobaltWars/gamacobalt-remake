// Fichier principal pour la gestion des thèmes
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les boutons de thème
  const themeOptions = document.querySelectorAll('.theme-option');
  
  // Ajouter un écouteur d'événement à chaque bouton
  themeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      
      // Mettre à jour l'interface utilisateur
      updateThemeUI(theme);
      
      // Enregistrer la préférence de thème
      saveThemePreference(theme);
    });
  });
  
  // Charger le thème enregistré
  loadSavedTheme();
});

// Mettre à jour l'interface utilisateur avec le thème sélectionné
function updateThemeUI(theme) {
  // Mettre à jour l'attribut data-theme du body
  document.body.setAttribute('data-theme', theme);
  
  // Mettre à jour la classe active sur les boutons de thème
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    if (option.getAttribute('data-theme') === theme) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

// Enregistrer la préférence de thème
function saveThemePreference(theme) {
  // Enregistrer dans localStorage
  localStorage.setItem('theme', theme);
  
  // Envoyer au serveur si l'utilisateur est connecté
  if (isUserLoggedIn()) {
    fetch('/set-theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Thème enregistré sur le serveur:', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement du thème:', error);
    });
  }
}

// Charger le thème enregistré
function loadSavedTheme() {
  // Vérifier d'abord dans localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    updateThemeUI(savedTheme);
  } else {
    // Utiliser le thème par défaut (blue-dark)
    updateThemeUI('blue-dark');
  }
}

// Vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
  // Cette fonction doit être adaptée à votre logique d'authentification
  return document.body.classList.contains('user-logged-in');
}
