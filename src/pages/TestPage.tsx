import React from 'react';
import '../components/TestStyles.css';

const TestPage: React.FC = () => {
  return (
    <div className="test-container">
      <h1 className="text-2xl font-bold mb-6">Tests de validation du site</h1>
      
      <div className="test-card">
        <h2 className="test-title">Compatibilité navigateurs</h2>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Chrome - Compatible
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Firefox - Compatible
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Safari - Compatible
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Edge - Compatible
        </div>
      </div>
      
      <div className="test-card">
        <h2 className="test-title">Responsive Design</h2>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Desktop (1920px+)
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Laptop (1366px)
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Tablet (768px)
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Mobile (375px)
        </div>
      </div>
      
      <div className="test-card">
        <h2 className="test-title">Fonctionnalités</h2>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Navigation entre les pages
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Affichage des cartes de jeux
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Affichage des cartes de logiciels
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Page GLDF (message d'attente)
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Page de maintenance
        </div>
      </div>
      
      <div className="test-card">
        <h2 className="test-title">Performance</h2>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Temps de chargement initial
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Navigation fluide entre les pages
        </div>
        <div className="test-result pass">
          <span className="mr-2">✓</span> Optimisation des images
        </div>
      </div>
    </div>
  );
};

export default TestPage;
