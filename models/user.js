module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    daily: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    weekly: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return User;
};
