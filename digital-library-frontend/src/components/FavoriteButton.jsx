//address: digital-library-frontend/src/components/FavoriteButton.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import { Button } from '@mui/material';

const FavoriteButton = ({ bookId, onToggle }) => {
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get('/books/user/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const isFav = res.data.some(book => book._id === bookId);
        setIsFavorite(isFav);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };
    if (user) fetchFavorites();
  }, [user, bookId]);

  const handleToggle = async () => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    try {
      if (isFavorite) {
        await api.delete(`/books/${bookId}/favorite`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await api.post(`/books/${bookId}/favorite`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      setIsFavorite(!isFavorite);
      if (onToggle) onToggle();
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Button
      variant={isFavorite ? 'contained' : 'outlined'}
      color="primary"
      onClick={handleToggle}
      disabled={isLoading}
    >
      {isFavorite ? 'Remove from My Books' : 'Add to My Books'}
    </Button>
  );
};

export default FavoriteButton;