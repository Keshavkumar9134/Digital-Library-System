//address: digital-library-frontend/src/components/PdfViewerButton.jsx
import React from 'react';
import { Button, Typography } from '@mui/material';
import api from '../services/api';
const PdfViewerButton = ({ pdfPath }) => (
  pdfPath ? (
    <Button
      variant="contained"
      color="primary"
      href={`https://digital-library-system-backend-hjqc.onrender.com/${pdfPath}`}
      target="_blank"
      sx={{ mt: 2, mr: 1 }}
    >
      View PDF
    </Button>
  ) : (
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
      No PDF available for this book.
    </Typography>
  )
);

export default PdfViewerButton;
