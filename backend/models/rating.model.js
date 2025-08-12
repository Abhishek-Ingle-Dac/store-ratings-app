module.exports = (sequelize, DataTypes) => {
const Rating = sequelize.define('Rating', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
score: { type: DataTypes.INTEGER, allowNull: false },
comment: { type: DataTypes.TEXT },
userId: { type: DataTypes.INTEGER, allowNull: false },
storeId: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'ratings' });
return Rating;
};
