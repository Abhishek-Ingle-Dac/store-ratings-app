const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./user.model')(sequelize, DataTypes);
const Store = require('./store.model')(sequelize, DataTypes);
const Rating = require('./rating.model')(sequelize, DataTypes);

// Associations
User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'userId' });
Store.hasMany(Rating, { foreignKey: 'storeId', onDelete: 'CASCADE' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });
// If Store Owner is also a user, we store ownerId referencing User
User.hasMany(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { foreignKey: 'ownerId' });
module.exports = { sequelize, User, Store, Rating };
