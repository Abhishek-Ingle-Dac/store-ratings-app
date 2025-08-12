const { body } = require('express-validator');
const nameValidation = body('name')
    .isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters');
const addressValidation = body('address')
    .isLength({ max: 400 }).withMessage('Address max 400 chars');
const passwordValidation = body('password')
    .isLength({ min: 8, max: 16 })
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain a special character');
const emailValidation = body('email').isEmail().withMessage('Invalid email');
module.exports = {
    nameValidation, addressValidation, passwordValidation,
    emailValidation
};
