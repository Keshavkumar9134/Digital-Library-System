// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const path = require('path');

dotenv.config();  
connectDB();
const app = express();

// const __dirname = path.resolve(); // Get the current directory path
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

const bookRoutes = require('./routes/bookRoutes');
// console.log(bookRoutes); // check what's being imported
app.use('/api/books', bookRoutes);

app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Digital Library Backend is running');
});

// app.use(express.static(path.join(__dirname, "digital-library-frontend/dist")));
// app.get('*', (_, res) => {
//   res.sendFile(path.resolve(__dirname,"digital-library-frontend", "dist", "index.html"));
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
