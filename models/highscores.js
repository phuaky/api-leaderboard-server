'use strict';
module.exports = function(sequelize, DataTypes) {
  var highscores = sequelize.define('highscores', {
    name: DataTypes.STRING,
    initials: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return highscores;
};