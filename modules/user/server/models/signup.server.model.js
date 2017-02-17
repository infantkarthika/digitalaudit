'use strict';

/**
 * Exports
 * @param  {[type]} sequelize [description]
 * @param  {[type]} DataTypes [description]
 * @return {[type]}           [description]
 */
module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('signup', {
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
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  });
  return User;
};
