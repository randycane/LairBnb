'use strict';

const validImages = [
  {
  spotId: 1,
    reviewId: 1,
    previewImage: 1,
    url: "raven",
    userId: 2
  },
  {
  spotId: 2,
  reviewId: 2,
  previewImage: true,
    url: "vegetables",
    userId: 3,
  },
  {
    spotId: 3,
    reviewId: 3,
    previewImage: true,
    url: "noodles",
    userId:4,
  },
  {
    spotId: 4,
    reviewId: 5,
    previewImage: true,
    url: "wine",
    userId: 5,
  },
  {
    spotId: 5,
    reviewId: 4,
    previewImage: true,
    url: "bunk",
    userId: 1
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
