//src/services/bookServices.js
import api from './api';

export const fetchBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};
