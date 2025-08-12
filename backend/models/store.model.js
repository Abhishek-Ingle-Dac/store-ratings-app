module.exports = (sequelize, DataTypes) => {
const Store = sequelize.define('Store', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(150), allowNull: false },
email: { type: DataTypes.STRING(100) },
address: { type: DataTypes.STRING(400) },
ownerId: { type: DataTypes.INTEGER }
}, { tableName: 'stores' });
return Store;
};
