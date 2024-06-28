'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      })
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    products: DataTypes.JSON,
    amount: DataTypes.INTEGER,
    table_number: DataTypes.INTEGER,
    dining_option: DataTypes.STRING,
    note: DataTypes.TEXT,
    status: DataTypes.ENUM('pending', 'success', 'failed'),
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};