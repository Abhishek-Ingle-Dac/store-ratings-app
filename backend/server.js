const express = require('express');
const cors = require('cors');
const session=require('express-session');
require('dotenv').config();
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const storeRoutes = require('./routes/store.routes');
const ratingRoutes = require('./routes/rating.routes');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET||'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly:true,
        secure: false,
        sameSite:'lax',
        maxAge:1000*60*60*24
    }
}));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true })
.then(() => {
console.log('DB synced');
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
})
.catch(err => console.error(err));
