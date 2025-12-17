'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockMovement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StockMovement.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' })
      StockMovement.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' })
      StockMovement.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' })
    }
  }
  StockMovement.init({
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('IN', 'OUT', 'ADJUSMENT'),
      allowNull: false
    },
    referenceType: {
      type: DataTypes.ENUM('PO', 'DO', 'ADJUSTMENT'),
      allowNull: false
    },
    referenceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantityChange: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previousStock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    newStock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StockMovement',
  });
  return StockMovement;
};