//address: digital-library-frontend/src/components/BookCover.jsx
import React from 'react';

const BookCover = ({ coverImageUrl, title }) => (
  coverImageUrl && (
    <img
      src={`https://digital-library-system-backend-hjqc.onrender.com/${coverImageUrl}`}
      alt={title}
      style={{ maxWidth: '100%', maxHeight: 400, marginBottom: '1rem' }}
    />
  )
);

export default BookCover;
