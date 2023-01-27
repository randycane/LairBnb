'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // previewImage: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: true
      // },
      spotId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Spots',
          key: 'id',
        }
      },
      imageableId: {
        type: Sequelize.INTEGER
      },
      imageableType: {
        type: Sequelize.STRING,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        //allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};
