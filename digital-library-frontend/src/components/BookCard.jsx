//address: digital-library-frontend/src/components/BookCard.jsx
import React from 'react';
import { Card,CardMedia, CardContent, Typography, CardActions, Button, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/${book.coverImageUrl}`}
                alt={book.title}
              />
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {book.averageRating
            ? `${book.averageRating.toFixed(1)} / 5 (${book.ratingsCount} ratings)`
            : 'No ratings yet'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/books/${book._id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
