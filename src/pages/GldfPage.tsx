import React from 'react';

const GldfPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="mb-8">
        <img 
          src="/assets/cat.gif" 
          alt="Chat en attente" 
          className="mx-auto rounded-lg shadow-md"
          style={{ maxWidth: '300px' }}
        />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Oups ...</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Cette page n'est pas encore disponible, mais arrive bientôt !
      </p>
    </div>
  );
};

export default GldfPage;
