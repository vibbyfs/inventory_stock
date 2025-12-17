'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseOrderItem.belongsTo(models.PurchaseOrder, { foreignKey: 'purchaseOrderId', as: 'purchaseOrder' })
      PurchaseOrderItem.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' })
    }
  }
  PurchaseOrderItem.init({
    purchaseOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantityOrdered: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantityReceived: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    unitPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PurchaseOrderItem',
  });
  return PurchaseOrderItem;
};