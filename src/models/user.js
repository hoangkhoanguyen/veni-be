'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Product, {foreignKey: 'sellerId', as: 'sellerData'})
      
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:DataTypes.STRING,
    phoneNumber:DataTypes.STRING,
    address:DataTypes.STRING,
    location:DataTypes.STRING,
    image: DataTypes.STRING,
    isLinkedGoogle: DataTypes.BOOLEAN,
    isLinkedFacebook: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};