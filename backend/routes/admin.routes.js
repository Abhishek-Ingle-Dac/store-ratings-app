// backend/routes/admin.routes.js
const express=require('express');
const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
// Dummy login route so frontend doesn't break
router.post('/login', (req, res) => {
  res.json({
    message: 'Login successful (public API mode)',
    user: { role: 'ADMIN', name: 'Public Admin' }
  });
});

// Public dashboard
router.get('/dashboard', adminController.dashboard);

// Public user management (no auth checks)
router.post('/users', authMiddleware,adminController.createUser);
router.get('/users', adminController.listUsers);

// Public store listing
router.get('/stores', adminController.listStores);

module.exports = router;
