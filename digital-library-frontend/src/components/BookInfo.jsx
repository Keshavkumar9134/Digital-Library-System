//address: digital-library-frontend/src/components/BookInfo.jsx
import React from 'react';
import { Typography, Box, Rating } from '@mui/material';

const BookInfo = ({ title, author, category, publishedDate, averageRating, ratingsCount }) => (
  <>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h6" gutterBottom>
      Writer: {author}
    </Typography>
    <Typography variant="h6" gutterBottom>
      Category: {category}
    </Typography>
    <Typography variant="h6" gutterBottom>
      Published Date: {new Date(publishedDate).toLocaleDateString()}
    </Typography>
    
    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="read-only"
        value={averageRating || 0}
        precision={0.1}
        readOnly
        size="large"
      />
      <Typography variant="body1" sx={{ ml: 1 }}>
        {averageRating
          ? `${averageRating.toFixed(1)} / 5 (${ratingsCount} ratings)`
          : 'No ratings yet'}
      </Typography>
    </Box>
  </>
);

export default BookInfo;