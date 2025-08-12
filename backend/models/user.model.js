module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING(60), allowNull: false },
email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
password: { type: DataTypes.STRING, allowNull: false },
address: { type: DataTypes.STRING(400) },
role: { type: DataTypes.ENUM('ADMIN','USER','OWNER'), defaultValue: 'USER' }
}, { tableName: 'users' });
return User;
};
