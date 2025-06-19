import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Divider,
  Stack,
  Grid,
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import BookInfo from '../components/BookInfo';
import BookCover from '../components/BookCover';
import PdfViewerButton from '../components/PdfViewerButton';
import RatingSection from '../components/RatingSection';
import FavoriteButton from '../components/FavoriteButton';

const BookDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error('Error fetching book details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      await fetchBook();
    } catch (err) {
      console.error('Error refreshing book:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!book) {
    return (
      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Book not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        {/* Book Title Heading */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color="primary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          {book.title}
        </Typography>

        {/* Book Cover and Details Side-by-Side */}
        <Grid container spacing={4}>
          {/* Left: Book Cover */}
          <Grid item xs={12} md={5}>
            <Box display="flex" justifyContent="center">
              <BookCover coverImageUrl={book.coverImageUrl} title={book.title} />
            </Box>
          </Grid>

          {/* Right: Book Info */}
          <Grid item xs={12} md={7}>
            <BookInfo
              title={book.title}
              author={book.author}
              category={book.category}
              publishedDate={book.publishedDate}
              averageRating={book.averageRating}
              ratingsCount={book.ratingsCount}
            />
          </Grid>
        </Grid>

        {/* Action Buttons Centered Below */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ width: '100%', maxWidth: 400 }}
          >
            <PdfViewerButton pdfPath={book.pdfPath} fullWidth />
            <FavoriteButton bookId={book._id} onToggle={handleFavoriteToggle} fullWidth />
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Rating Section */}
        <RatingSection
          bookId={id}
          bookTitle={book.title}
          user={user}
          onRatingSubmit={() => {
            api.get(`/books/${id}`).then((res) => setBook(res.data));
          }}
        />
      </Paper>
    </Container>
  );
};

export default BookDetailPage;
