'use strict';

const validReviews = [
  {
    userId: 3,
    spotId: 1,
    review: 'The spiral staircase was lovely',
    stars: 5
  },
  {
    userId: 4,
    spotId: 5,
    review: 'The beds were so cramped, no room to move',
    stars: 1
  },
  {
    userId: 1,
    spotId: 4,
    review: 'The tennis court in the backyard was so excellent',
    stars: 5
  },
  {
    userId: 5,
    spotId: 2,
    review: 'The kitchen was so shiny',
    stars: 4
  },
  {
    userId: 2,
    spotId: 3,
    review: 'This was the dirtiest place I ever witnessed',
    stars: 1
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', validReviews)
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
    await queryInterface.bulkDelete('Reviews', validReviews, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
