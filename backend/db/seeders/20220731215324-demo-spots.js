'use strict';

const validSpots = [
  {
    address: '100 Folsom Street',
    city: 'San Francisco',
    state: 'California',
    country: 'USA',
    lat: 45.99,
    lng: 42.3,
    name: 'Raven Tower',
    description: 'Beautiful tall building',
    price: 300,
    ownerId: 2
  },
  {
    address: '200 Falmouth Street',
    city: 'Daly City',
    state: 'California',
    country: 'USA',
    lat: 87.99,
    lng: 39.3,
    name: 'High Garden',
    description: 'Grassy and open area',
    price: 200,
    ownerId: 5
  },
  {
    address: '3 Convoy Street',
    city: 'San Diego',
    state: 'California',
    country: 'USA',
    lat: 98.99,
    lng: 20.3,
    name: 'Cabin',
    description: 'Cozy for campers',
    price: 100,
    ownerId: 3
  },
  {
    address: '1 Cleveland Way',
    city: 'Cleveland',
    state: 'Ohio',
    country: 'USA',
    lat: 49.99,
    lng: 39.3,
    name: 'The Chosen Place',
    description: 'Brand new mansion',
    price: 1100,
    ownerId: 1
  },
  {
    address: '6 Romeo Drive',
    city: 'Buffalo',
    state: 'New York',
    country: 'USA',
    lat: 99.99,
    lng: 26.3,
    name: 'Bunkhouse',
    description: 'Bring all your friends here',
    price: 247,
    ownerId: 4
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', validSpots)
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
    await queryInterface.bulkDelete('Spots', validSpots, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
