//:digital-library-frontend/src/pages/AdminBookListPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminBookListPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Books API response:", res.data);//checking for the array or object type
        setBooks(res.data.books); // ✅ Correctly extract the books array (if array type then use res.books)
      } catch (err) {
        console.error(err);
        alert('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={5} mb={3}>Manage Books</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Author</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminBookListPage;
