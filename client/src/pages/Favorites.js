import React, { useState, useEffect } from 'react';
import api from '../api';
import TemplateCard from '../components/TemplateCard';

const Favorites = ({ isAuthenticated }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (id) => {
    try {
      await api.post(`/favorites/${id}`);
      // Remove from list since this is the favorites page
      setFavorites(favorites.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500">Browse the templates page and click the heart icon to add favorites.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
