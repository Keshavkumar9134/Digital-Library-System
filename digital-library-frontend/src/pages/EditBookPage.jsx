//address: digital-library-frontend/src/pages/EditBookPage.jsx
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditBookPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    publishedDate: '',
    coverImage: null,
    pdfFile: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/books/${id}`);
      const { title, author, category, publishedDate } = res.data;
      setForm({ title, author, category, publishedDate, coverImage: null, pdfFile: null });
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const token = localStorage.getItem('token');
      await api.put(`/books/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Book updated!');
      navigate('/admin/books');
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={5}>Edit Book</Typography>
      <Box mt={3}>
        <TextField label="Title" name="title" fullWidth margin="normal" value={form.title} onChange={handleChange} />
        <TextField label="Author" name="author" fullWidth margin="normal" value={form.author} onChange={handleChange} />
        <TextField label="Category" name="category" fullWidth margin="normal" value={form.category} onChange={handleChange} />
        <TextField label="Published Date" name="publishedDate" fullWidth margin="normal" value={form.publishedDate} onChange={handleChange} />
        <Box mt={2}>
          <label>New Cover Image: <input type="file" name="coverImage" onChange={handleFileChange} /></label>
        </Box>
        <Box mt={2}>
          <label>New PDF File: <input type="file" name="pdfFile" onChange={handleFileChange} /></label>
        </Box>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Update</Button>
      </Box>
    </Container>
  );
};

export default EditBookPage;
