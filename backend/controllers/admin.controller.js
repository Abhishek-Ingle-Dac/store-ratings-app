const { User, Store, Rating } = require('../models');
const bcrypt = require('bcrypt');

// Dashboard stats
exports.dashboard = async (req, res) => {
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();
  res.json({ users, stores, ratings });
};

// Create a new user (any role)
exports.createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hashed, role });
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all users
exports.listUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'address', 'role']
  });
  res.json({ users });
};

// List all stores
exports.listStores = async (req, res) => {
  const stores = await Store.findAll();
  res.json({ stores });
};
