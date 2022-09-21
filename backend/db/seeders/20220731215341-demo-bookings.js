'use strict';

const validBookings = [{
  userId: 1,
  spotId: 2,
  startDate: "2024-10-11",
  endDate: "2024-10-16"
},
{
  userId: 5,
  spotId: 4,
  startDate: "2023-08-09",
  endDate: "2023-08-11"
  },
  {
    userId: 4,
    spotId: 3,
    startDate: "2023-11-12",
    endDate: "2023-11-19"
  },
  {
    userId: 3,
    spotId: 1,
    startDate: "2023-09-10",
    endDate: "2023-09-17"
  },
  {
    userId: 2,
    spotId: 5,
    startDate: "2023-08-23",
    endDate: "2023-08-25"
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', validBookings)
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
    await queryInterface.bulkDelete('Bookings', validBookings, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
