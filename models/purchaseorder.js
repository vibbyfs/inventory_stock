'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseOrder.hasMany(models.PurchaseOrderItem, {
        foreignKey: 'purchaseOrderId',
        as: 'items'
      });
      PurchaseOrder.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' })
      PurchaseOrder.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'updater' })
    }
  }
  PurchaseOrder.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'draft'
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    receivedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PurchaseOrder',
  });
  return PurchaseOrder;
};