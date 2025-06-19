
// routes/bookRoutes.js
const express = require('express');
const User = require('../models/User');
const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  rateBook,
  addToFavorites,
  removeFromFavorites,
  getFavoriteBooks,
  
} = require('../controllers/bookController');

// // multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });


// Defining storage with dynamic destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'coverImage') {
      cb(null, 'uploads/covers/');
    } else if (file.fieldname === 'pdfFile') {
      cb(null, 'uploads/pdfs/');
    } else {
      cb(new Error('Invalid file field'), '');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
// Accept both fields in one upload
const upload = multer({ storage: storage });


// routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', protect,isAdmin, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]), addBook); //after a user is authenticated and is an admin, they can add a book
router.put('/:id',protect,isAdmin, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]), updateBook);
 router.delete('/:id', protect, isAdmin, deleteBook);

router.post('/:id/rate', protect, rateBook); // User can rate a book after authentication


////////////////................,,,,,,,,,,,./////////////////
// 🔒 Check if a book is in user's favorites
// router.get('/:id/is-favorite', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const isFavorite = user.favorites.includes(req.params.id);
//     res.json({ isFavorite });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
/////////////////////.....................,,,,,,.///////

//Add/remove from favorite books
// router.post('/:id/favorite', protect, addToFavorites); // Add book to favorites
router.post('/:id/favorite', protect, addToFavorites);
router.delete('/:id/favorite', protect, removeFromFavorites); // Remove book from favorites
router.get('/user/favorites', protect, getFavoriteBooks); // Get all favorite book
module.exports = router;
