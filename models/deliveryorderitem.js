'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryOrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeliveryOrderItem.belongsTo(models.DeliveryOrder, {
        foreignKey: 'deliveryOrderId',
        as: 'deliveryOrder'
      });

      DeliveryOrderItem.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item'
      });
    }
  }
  DeliveryOrderItem.init(
    {
      deliveryOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantityShipped: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unitPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'DeliveryOrderItem'
    }
  );

  return DeliveryOrderItem;
};