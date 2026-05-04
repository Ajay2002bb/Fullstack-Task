import React, { useState, useEffect } from 'react';
import api from '../api';
import TemplateCard from '../components/TemplateCard';
import { Search } from 'lucide-react';

const Templates = ({ isAuthenticated }) => {
  const [templates, setTemplates] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/templates', {
        params: { search, category: category || undefined }
      });
      setTemplates(response.data);
    } catch (error) {
      console.error('Failed to fetch templates', error);
    }
  };

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data.map(t => t.id));
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [search, category]);

  useEffect(() => {
    fetchFavorites();
  }, [isAuthenticated]);

  const handleToggleFavorite = async (id) => {
    try {
      const response = await api.post(`/favorites/${id}`);
      if (response.data.favorited) {
        setFavorites([...favorites, id]);
      } else {
        setFavorites(favorites.filter(favId => favId !== id));
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  const categories = ['', 'Dashboard', 'E-commerce', 'Landing Page', 'Portfolio', 'Blog'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Available Templates</h1>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Categories</option>
            {categories.filter(Boolean).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isFavorite={favorites.includes(template.id)}
            onToggleFavorite={handleToggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
      
      {templates.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No templates found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default Templates;
