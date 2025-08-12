const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
//const bcrypt=require('bcrypt');
require('dotenv').config();
exports.signup = async (req, res) => {
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        errors:
            errors.array()
    });
      try {
    const { name, email, address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, address, password: hashed,
        role: 'USER'
    });
     req.session.userId = user.id;  // Store user ID in session
    req.session.role = user.role;
    res.json({ user });
    res.json({ message: 'OK', userId: user.id });
      }
      catch (err) {
        res.status(500).json({message:err.message});
      }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  
     req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ user });
   // res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};
exports.changePassword = async (req, res) => {
    // expects token in Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token' });
    try {
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { oldPassword, newPassword } = req.body;
        const user = await User.findByPk(payload.id);
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(400).json({ message: 'Old passwordincorrect' });
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed; await user.save();
        res.json({ message: 'Password changed' });
    } catch (err) { return res.status(401).json({ message: 'Invalid token' }); }
};
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
};

exports.me = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Not authenticated' });
  const user = await User.findByPk(req.session.userId, { attributes: ['id', 'name', 'email', 'role', 'address'] });
  res.json({ user });
};