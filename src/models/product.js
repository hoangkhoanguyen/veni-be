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
      this.belongsTo(models.User, { foreignKey: 'sellerId', targetKey: 'id', as: 'sellerData' })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    total: DataTypes.INTEGER,
    booked:DataTypes.INTEGER,
    image: DataTypes.STRING,
    sellerId: DataTypes.INTEGER,
    summary: DataTypes.TEXT,
    detailsDescription: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};