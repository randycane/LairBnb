'use strict';

const validImages = [
  {
  spotId: 1,
    reviewId: 1,
    previewImage: 1,
    url: "raven"
  },
  {
  spotId: 2,
  reviewId: 2,
  previewImage: 1,
  url: "vegetables"
  },
  {
    spotId: 3,
    reviewId: 3,
    previewImage: 1,
    url: "noodles"
  },
  {
    spotId: 4,
    reviewId: 5,
    previewImage: 1,
    url: "wine"
  },
  {
    spotId: 5,
    reviewId: 4,
    previewImage: 1,
    url: "bunk"
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', validImages)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', validImages, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
