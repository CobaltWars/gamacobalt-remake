import React from 'react';
import GameCard from '../components/GameCard';

const GamesPage: React.FC = () => {
  // Données des jeux (à remplacer par des données réelles)
  const games = [
    {
      id: 1,
      title: "My Chess",
      description: "Description du Jeu: C'est un jeu d'échec très original : il est octogonal",
      imageUrl: "/assets/echec.png",
      downloadUrl: "#",
      isExternalLink: false
    },
    {
      id: 2,
      title: "Flappy Bird Remastered",
      description: "Description du Jeu: Le bon vieux Flappy Bird, mais en 10x mieux !",
      imageUrl: "/assets/flappy.png",
      downloadUrl: "#",
      isExternalLink: false
    },
    {
      id: 3,
      title: "Towers Escape",
      description: "Description du jeu: Un remix du dino-game, mais seulement votre skill sera mis à rude épreuve !",
      imageUrl: "/assets/towersescape.png",
      downloadUrl: "#",
      isExternalLink: false
    },
    {
      id: 4,
      title: "Conways game of life",
      description: "Plongez dans une simulation du jeu imaginé par John Horton Conway.",
      imageUrl: "/assets/co_game.png",
      downloadUrl: "https://cobaltwars.itch.io/conways-game-of-life",
      isExternalLink: true
    },
    {
      id: 5,
      title: "Let's do math",
      description: "test beta 0.0.0.1",
      imageUrl: "",
      downloadUrl: "#",
      isExternalLink: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Jeux</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
            downloadUrl={game.downloadUrl}
            isExternalLink={game.isExternalLink}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
