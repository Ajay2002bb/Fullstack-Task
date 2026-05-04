import React from 'react';
import { Heart } from 'lucide-react';

const TemplateCard = ({ template, isFavorite, onToggleFavorite, isAuthenticated }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={template.thumbnail_url} 
        alt={template.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
          {isAuthenticated && (
            <button 
              onClick={() => onToggleFavorite(template.id)}
              className="focus:outline-none"
            >
              <Heart 
                className={`w-6 h-6 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                }`} 
              />
            </button>
          )}
        </div>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
          {template.category}
        </span>
        <p className="text-gray-600 text-sm">{template.description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
