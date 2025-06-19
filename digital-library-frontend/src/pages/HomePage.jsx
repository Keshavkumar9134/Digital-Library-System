// 📁 src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/bookService';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Example categories - you might want to fetch these from your API
  const categories = [
    'All',
    'Fiction',
    'Friendship',
    'Love and Devotional',
    'Science',
    'Success',
    'Biography',
    'History',
    'Fantasy',
    'Romance',
    'Mystery',
    'Thriller',
    'Horror',
  ];

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data.books);
        setFilteredBooks(data.books);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.category && book.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <Container sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Available Books
      </Typography>

      {/* Category Filter Buttons with Horizontal Scroll */}
      <Box sx={{ 
        mb: 4,
        width: '100%',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        py: 1,
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        }
      }}>
        <Box sx={{ 
          display: 'inline-flex',
          gap: 1,
          px: 1
        }}>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => filterByCategory(category)}
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              sx={{ 
                textTransform: 'none',
                borderRadius: '20px',
                minWidth: '100px',
                px: 3,
                fontSize: '0.875rem',
                fontWeight: selectedCategory === category ? '600' : '500',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: selectedCategory === category ? 'none' : '0 2px 5px rgba(0,0,0,0.1)',
                }
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {filteredBooks.length === 0 && !loading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No books found in this category
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 3,
        }}
      >
        {filteredBooks.map((book) => (
          <Card
            key={book._id}
            sx={{
              width: '100%',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3,
              },
            }}
            onClick={() => navigate(`/books/${book._id}`)}
          >
            <CardMedia
              component="img"
              height="180"
              image={`http://localhost:5000/${book.coverImageUrl}`}
              alt={book.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" noWrap>{book.title}</Typography>
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
                  fontWeight: '500',
                  display: 'inline-block',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View Details
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;