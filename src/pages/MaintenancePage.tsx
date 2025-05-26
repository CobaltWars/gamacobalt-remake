import React from 'react';

const MaintenancePage: React.FC = () => {
  // Fonction pour créer des étoiles en arrière-plan
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`
      };
      stars.push(<div key={i} className="star" style={style}></div>);
    }
    return stars;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-blue-50 overflow-hidden">
      {/* Étoiles en arrière-plan */}
      <style>{`
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #1e88e5;
          border-radius: 50%;
          animation: twinkle 3s linear infinite;
        }
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
      
      {renderStars()}
      
      <div className="bg-white p-8 rounded-lg shadow-md text-center z-10">
        <div className="text-4xl text-blue-500 mb-4 animate-spin">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-blue-600 mb-4">GamaCobalt est en maintenance</h1>
        <p className="text-gray-600">Nous serons de retour sous peu. Merci pour votre patience.</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
