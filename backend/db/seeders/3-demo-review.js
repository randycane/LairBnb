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
    userId: 3,
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
  },
  {
    userId: 3,
    spotId: 6,
    review: 'I love all the rocks!',
    stars: 5
  },
  {
    userId: 4,
    spotId: 7,
    review: 'I was not brave enough to stay here.',
    stars: 1
  },
  {
    userId: 1,
    spotId: 8,
    review: 'The infinity pool was insane.',
    stars: 5
  },
  {
    userId: 5,
    spotId: 9,
    review: 'The vibes were so good.',
    stars: 4
  },
  {
    userId: 2,
    spotId: 10,
    review: 'This place was pretty boring.',
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
