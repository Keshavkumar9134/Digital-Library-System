//src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://digital-library-system-backend-hjqc.onrender.com/api', // Your backend base URL
});

export default api;
