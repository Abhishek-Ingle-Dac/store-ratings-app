const router = require('express').Router();
const ratingController = require('../controllers/rating.controller');
const authMiddleware = require('../middleware/auth.middleware');
router.post('/', authMiddleware, ratingController.createRating);
// Removed auth middleware for public access
router.post('/', authMiddleware,ratingController.submitOrUpdateRating);
router.get('/store/:storeId', ratingController.getRatingsForStore);

module.exports = router;
