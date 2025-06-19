//middleware/isAdminMiddleware.js
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // ✅ only allow admins
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
};
module.exports = isAdmin;
