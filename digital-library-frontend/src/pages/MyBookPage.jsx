//address: src/pages/MyBooksPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Alert,
  Button,
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import FavoriteButton from '../components/FavoriteButton';

const MyBooksPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    try {
      const res = await api.get('/books/user/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching favorite books:', err);
      setError('Failed to load favorite books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchFavorites();
    else setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Please login to view your favorite books</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Container>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  if (books.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">No favorite books found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Favorite Books
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={3}
      >
        {books.map((book) => (
          <Card
            key={book._id}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:5000/${book.coverImageUrl}`}
              alt={book.title}
              onClick={() => navigate(`/books/${book._id}`)}
            />
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <FavoriteButton
                  bookId={book._id}
                  onToggle={fetchFavorites}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default MyBooksPage;
