//models/Book.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  coverImageUrl: { type: String },
  pdfPath: { type: String },
  ratings: [ratingSchema],
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 }
});

// Add method to update average rating
bookSchema.methods.updateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    this.ratingsCount = 0;
    return;
  }
  
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  this.averageRating = sum / this.ratings.length;
  this.ratingsCount = this.ratings.length;
};

bookSchema.virtual('isFavorite').get(function() {
  // This requires population when querying
  return false; // Default, will be set during population
});
bookSchema.set('toObject', { virtuals: true });
bookSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Book', bookSchema);