'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeliveryOrder.hasMany(models.DeliveryOrderItem, {
        foreignKey: 'deliveryOrderId',
        as: 'items'
      });
      DeliveryOrder.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' })
      DeliveryOrder.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'updater' })
    }
  }
  DeliveryOrder.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'confirmed', 'shipped', 'cancelled'),
      allowNull: false,
      defaultValue: 'draft'
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false
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
    modelName: 'DeliveryOrder',
  });
  return DeliveryOrder;
};