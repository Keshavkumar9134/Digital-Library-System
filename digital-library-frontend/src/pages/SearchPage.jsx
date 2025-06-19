//src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/bookService';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Rating
} from '@mui/material';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBooks();
        const filtered = data.books.filter((book) =>
          book.title.toLowerCase().includes(query?.toLowerCase())
        );
        setBooks(filtered);
        setLoading(false);
      } catch (err) {
        setError('Failed to load books');
        setLoading(false);
      }
    };

    load();
  }, [query]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search Results for "{query}"
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && books.length === 0 && (
        <Typography>No results found.</Typography>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'flex-start',
        }}
      >
        {books.map((book) => (
          <Card
            key={book._id}
            sx={{
              width: 260,
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 6,
              },
            }}
            onClick={() => navigate(`/books/${book._id}`)}
          >
            <CardMedia
              component="img"
              height="180"
              image={`https://digital-library-system-backend-hjqc.onrender.com/${book.coverImageUrl}`}
              alt={book.title}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                by {book.author}
              </Typography>
              <Rating
                name="read-only"
                value={book.averageRating || 0}
                precision={0.1}
                readOnly
                size="small"
                sx={{ mt: 1 }}
              />
              <Typography
                variant="body2"
                mt={2}
                color="primary"
                sx={{
                  transition: 'color 0.3s, text-decoration 0.3s',
                  '&:hover': {
                    color: 'secondary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                View Details
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default SearchPage;
