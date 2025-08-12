const { Rating } = require('../models');

exports.submitOrUpdateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, score, comment } = req.body;

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: 'Score must be between 1 and 5' });
    }

    let rating = await Rating.findOne({ where: { userId, storeId } });
    if (rating) {
      rating.score = score;
      rating.comment = comment;
      await rating.save();
      return res.json({ message: 'Rating updated', rating });
    }

    rating = await Rating.create({ userId, storeId, score, comment });
    res.json({ message: 'Rating created', rating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRatingsForStore = async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { storeId: req.params.storeId } });
    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createRating = async (req, res) => {
  try {
    const { storeId, score, comment } = req.body;
    const rating = await Rating.create({
      storeId,
      score,
      comment,
      userId: req.session.userId
    });
    res.json(rating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

