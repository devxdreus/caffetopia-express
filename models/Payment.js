'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',
      });
    }
  }
  Payment.init({
    order_id: DataTypes.INTEGER,
    method: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
