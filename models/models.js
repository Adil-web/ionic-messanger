const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { addListener } = require("nodemon");

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.BLOB, defaultValue: null, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: "offline", allowNull: false },
  description: { type: DataTypes.STRING, defaultValue: "Hi I use messanger!", allowNull: true },
  contacts: { type: DataTypes.TEXT, defaultValue: "[]", allowNull: true }
});

const Token = sequelize.define('token', {
  user_id: { type: DataTypes.INTEGER, allowNull: false, },
  refreshToken: { type: DataTypes.TEXT, allowNull: false }
})

const Messages = sequelize.define('messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, },
  content: { type: DataTypes.TEXT, },
  createdAt: { type: DataTypes.DATE },
})

User.hasMany(Messages);
Messages.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

module.exports = {
  User, Messages, Token
}

