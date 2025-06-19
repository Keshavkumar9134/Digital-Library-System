//Address:src/components/RatingSection.jsx
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
} from '@mui/material';
import api from '../services/api';

const RatingSection = ({ bookId, bookTitle, user, onRatingSubmit }) => {
  const [ratingOpen, setRatingOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleOpenRating = () => {
    if (!user) {
      alert('Please login to rate this book.');
      return;
    }
    setRatingOpen(true);
  };

  const handleCloseRating = () => {
    setRatingOpen(false);
    setRatingValue(0);
    setComment('');
  };

  const handleSubmitRating = async () => {
    if (ratingValue === 0) {
      alert('Please select a rating.');
      return;
    }
    
    setSubmitLoading(true);
    try {
      const token = localStorage.getItem('token');
      await api.post(
        `/books/${bookId}/rate`,
        { rating: ratingValue, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Rating submitted successfully!');
      onRatingSubmit();
      handleCloseRating();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={handleOpenRating}
        disabled={!user}
      >
        Rate Your Experience
      </Button>

      <Dialog open={ratingOpen} onClose={handleCloseRating}>
        <DialogTitle>Rate "{bookTitle}"</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={ratingValue}
            onChange={(e, newValue) => setRatingValue(newValue)}
            size="large"
          />
          <TextField
            multiline
            rows={3}
            margin="normal"
            fullWidth
            label="Comments (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRating} disabled={submitLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitRating}
            disabled={submitLoading || ratingValue === 0}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RatingSection;