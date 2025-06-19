//address:digital-library-backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

router.get('/users', protect, isAdmin, adminController.getAllUsers);
router.delete('/users/:id', protect, isAdmin, adminController.deleteUser);

module.exports = router;
