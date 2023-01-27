'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Image.belongsTo(models.Review, {foreignKey: 'reviewId'})
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // previewImage: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // },
    imageableId: {
      type: DataTypes.INTEGER,
    },
    imageableType: {
      type: DataTypes.STRING,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewId: {
      type: DataTypes.INTEGER,
      //allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
  });
  return Image;
};
