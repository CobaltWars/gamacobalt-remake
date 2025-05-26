import React from 'react';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  downloadUrl: string;
  isExternalLink?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  downloadUrl,
  isExternalLink = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg">
      {imageUrl && (
        <div 
          className="h-48 bg-gray-200 bg-cover bg-center" 
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex">
          <a
            href={downloadUrl}
            target={isExternalLink ? "_blank" : undefined}
            rel={isExternalLink ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isExternalLink ? "Visiter" : "Télécharger"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
