import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue dans l'univers des gamers
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Découvrez les créations, développement de logiciels et de jeux vidéos, par une petite communauté de personnes dans un lycée.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/jeux"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Découvrir nos jeux
          </Link>
          <Link
            to="/logiciels"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Explorer nos logiciels
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Jeux Innovants"
          description="Plongez dans des univers uniques avec nos jeux communautaire et indépendants."
        />
        <FeatureCard
          title="Les logiciels"
          description="Des outils originaux mais qui peuvent aider et servir à plusieurs tâches du quotidiens."
        />
        <FeatureCard
          title="La GLDF"
          description="Cet espace, bientôt disponible, regroupera une petite communauté passionnée de joueurs et de créateurs pour partager, apprendre et évoluer ensemble."
        />
      </section>
    </div>
  );
};

export default HomePage;
