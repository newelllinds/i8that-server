module.exports = function (sequelize, DataTypes){
    const Dietlog = sequelize.define('dietlog', {
      food_item: {
        type: DataTypes.STRING,
        allowNull: false
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date_eaten: {
        type: DataTypes.STRING,
        allowNull: false
      },
      where_eaten: {
        type: DataTypes.STRING
      },
      feelings: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      owner: {
        type: DataTypes.INTEGER
      }
    });
    return Dietlog;
  };
  