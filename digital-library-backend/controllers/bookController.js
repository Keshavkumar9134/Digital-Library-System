//address:digital-library-backend/controllers/bookController.js
const Book = require('../models/Book');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
// Get all books with optional category filter and pagination
exports.getAllBooks = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(category.trim(), 'i') };
    }

    const totalBooks = await Book.countDocuments(filter);
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this category or page' });
    }

    res.json({
      totalBooks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBooks / parseInt(limit)),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// // GET all books with optional category filter, sorting, and pagination
// // controllers/bookController.js

// exports.getAllBooks = async (req, res) => {
//   try {
//     const {
//       category,
//       sortBy = 'createdAt',
//       order = 'desc',
//       page = 1,
//       limit = 10
//     } = req.query;

//     const filter = {};
//     if (category) {
//       filter.category = { $regex: new RegExp(category.trim(), 'i') };
//     }

//     const sortField = ['title', 'createdAt', 'averageRating'].includes(sortBy)
//       ? sortBy
//       : 'createdAt';
//     const sortOrder = order === 'asc' ? 1 : -1;

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const totalBooks = await Book.countDocuments(filter);
//     const books = await Book.find(filter)
//       .sort({ [sortField]: sortOrder })
//       .skip(skip)
//       .limit(parseInt(limit));

//     if (!books.length) {
//       return res.status(404).json({ message: 'No books found for this query' });
//     }

//     res.json({
//       totalBooks,
//       currentPage: parseInt(page),
//       totalPages: Math.ceil(totalBooks / parseInt(limit)),
//       books
//     });
//   } catch (err) {
//     console.error('Error in getAllBooks:', err.message);
//     res.status(500).json({ error: 'Server error while fetching books' });
//   }
// };




// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new book with optional cover image and PDF
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, publishedDate } = req.body;
    const coverImageUrl = req.files?.coverImage?.[0]?.path || null;
    const pdfPath = req.files?.pdfFile?.[0]?.path || null;

    const newBook = new Book({
      title,
      author,
      category,
      pdfPath,
      coverImageUrl,
      publishedDate,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing book with optional cover image and PDF
exports.updateBook = async (req, res) => {
  try {
    const { title, author, category, publishedDate } = req.body;
    const coverImageUrl = req.files?.coverImage?.[0]?.path;
    const pdfPath = req.files?.pdfFile?.[0]?.path;

    const updatedFields = {
      title,
      author,
      category,
      publishedDate,
    };

    if (coverImageUrl) updatedFields.coverImageUrl = coverImageUrl;
    if (pdfPath) updatedFields.pdfPath = pdfPath;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Rate a book
exports.rateBook = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already rated this book
    const existingRatingIndex = book.ratings.findIndex(
      r => r.user.toString() === req.user._id.toString()
    );
    
    if (existingRatingIndex >= 0) {
      // Update existing rating
      book.ratings[existingRatingIndex].rating = rating;
      book.ratings[existingRatingIndex].comment = comment;
    } else {
      // Add new rating
      book.ratings.push({
        user: req.user._id,
        rating,
        comment
      });
    }

    // Update average rating
    const sum = book.ratings.reduce((acc, r) => acc + r.rating, 0);
    book.averageRating = sum / book.ratings.length;
    book.ratingsCount = book.ratings.length;

    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add a book to favorites
exports.addToFavorites = async (req, res) => {
  const user = await User.findById(req.user._id);
  const bookId = req.params.id;
  if (!user.favorites.includes(bookId)) {
    user.favorites.push(bookId);
    await user.save();
  }
  res.status(200).json({ message: 'Book added to favorites' });
};

// Remove a book from favorites
// Remove a book from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const bookId = req.params.id;
    
    // Filter out null/undefined values and compare valid ObjectIDs
    user.favorites = user.favorites.filter(id => {
      return id && id.toString() !== bookId;
    });
    
    await user.save();
    res.status(200).json({ message: 'Book removed from favorites' });
  } catch (err) {
    console.error('Error removing from favorites:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all favorite books of a user
exports.getFavoriteBooks = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.status(200).json(user.favorites);
};
