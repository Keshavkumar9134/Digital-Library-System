//src/pages/UploadBookPage.jsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../services/api';

const UploadBookPage = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    publishedDate: '',
    coverImage: null,
    pdfFile: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const token = localStorage.getItem('token');
      await api.post('/books', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Book uploaded!');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={5}>Upload New Book</Typography>
      <Box mt={3}>
        <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Author" name="author" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Category" name="category" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Published Date" name="publishedDate" fullWidth margin="normal" onChange={handleChange} />
        <Box mt={2}>
          <label>
            Cover Image:&nbsp;
            <input type="file" name="coverImage" onChange={handleFileChange} />
          </label>
        </Box>
        <Box mt={2}>
          <label>
            PDF File:&nbsp;
            <input type="file" name="pdfFile" onChange={handleFileChange} />
          </label>
        </Box>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Upload</Button>
      </Box>
    </Container>
  );
};

export default UploadBookPage;
