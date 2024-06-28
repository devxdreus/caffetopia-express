'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    image: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true,
  });

  return Product;
};