import React from 'react';
import GameCard from '../components/GameCard';

const SoftwarePage: React.FC = () => {
  // Données des logiciels (à remplacer par des données réelles)
  const software = [
    {
      id: 1,
      title: "CMD & Powershell",
      description: "Description du logiciel: Logiciel qui permet de choisir l'exécution de cmd ou de powershell",
      imageUrl: "/assets/cmdpshell.png",
      downloadUrl: "#",
      isExternalLink: false
    },
    {
      id: 2,
      title: "Projet Débile",
      description: "Description du Projet: C'est un projet débile",
      imageUrl: "/assets/clock_icon.png",
      downloadUrl: "#",
      isExternalLink: false
    },
    {
      id: 3,
      title: "Genesis",
      description: "Description du logiciel: Un navigateur fait maison",
      imageUrl: "/assets/Genesis.png",
      downloadUrl: "https://mega.nz/file/V20jELbC#VJqk_Bf1JHs2nFGPpUFa441ovRHP4VOlN9kj09ovopE",
      isExternalLink: true
    },
    {
      id: 4,
      title: "Youtube.py",
      description: "Description du logiciel: Youtube.py, un logiciel open source visant à être mieux que celui d'origine",
      imageUrl: "/assets/yt_logo.png",
      downloadUrl: "#",
      isExternalLink: false
    },
    {
      id: 5,
      title: "Psiphon3",
      description: "Un VPN pour notre Emmy",
      imageUrl: "",
      downloadUrl: "#",
      isExternalLink: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Logiciels</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.map((item) => (
          <GameCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            downloadUrl={item.downloadUrl}
            isExternalLink={item.isExternalLink}
          />
        ))}
      </div>
    </div>
  );
};

export default SoftwarePage;
