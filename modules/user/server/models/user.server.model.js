'use strict';

/**
 * Exports
 * @param  {[type]} sequelize [description]
 * @param  {[type]} DataTypes [description]
 * @return {[type]}           [description]
 */
module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    site_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sfid: {
      allowNull: false,
      type: DataTypes.STRING
    },
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }
  , {
    freezeTableName: true,
    tableName: 'site_users',
    timestamps: false,
    instanceMethods: {
      /**
       * Authenticate
       * @param  {[type]} user     [description]
       * @param  {[type]} password [description]
       * @return {[type]}          [description]
       */
      authenticatePass: function(user, password) {
        return user.dataValues.password === password;
      },
      authenticateUser: function(user, username) {
        return user.dataValues.username === username;
      }
    }
  });
  return User;
};
