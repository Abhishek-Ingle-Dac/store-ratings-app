const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const validators = require('../utils/validators');
const authMiddleware = require('../middleware/auth.middleware'); // session-based check

// Signup
router.post(
  '/signup',
  [
    validators.nameValidation,
    validators.emailValidation,
    validators.addressValidation,
    validators.passwordValidation
  ],
  authController.signup
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  authController.login
);

// Change password (protected via session)
router.post('/change-password', authMiddleware, authController.changePassword);

// Logout
router.post('/logout', authController.logout);

// Get current user
router.get('/me', authController.me);

module.exports = router;
