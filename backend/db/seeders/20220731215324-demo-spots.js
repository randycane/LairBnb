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
    address: '5 Romeo Drive',
    city: 'Buffalo',
    state: 'New York',
    country: 'USA',
    lat: 99.99,
    lng: 26.3,
    name: 'Bunkhouse',
    description: 'Bring all your friends here',
    price: 247,
    ownerId: 4
  },
  {
    address: '6 Stone Way',
    city: 'San Pedro',
    state: 'California',
    country: 'USA',
    lat: 44.99,
    lng: 40.3,
    name: 'Stony Brook',
    description: 'Boulders galore, enjoy them.',
    price: 3000,
    ownerId: 5
  },
  {
    address: '7 Julie Drive',
    city: 'Edison',
    state: 'California',
    country: 'USA',
    lat: 89.99,
    lng: 19.3,
    name: 'Lion Heart',
    description: 'For the brave and noble people.',
    price: 900,
    ownerId: 4
  },
  {
    address: '8 Commercial Street',
    city: 'San Dimas',
    state: 'California',
    country: 'USA',
    lat: 99.99,
    lng: 27.3,
    name: 'Penthouse Suite',
    description: 'For the luxury lovers.',
    price: 900,
    ownerId: 3
  },
  {
    address: '9 Kentucky Way',
    city: 'Mary',
    state: 'Lentucky',
    country: 'USA',
    lat: 30.99,
    lng: 39.3,
    name: 'Kentucky Fried Chicken',
    description: 'Headquarters of the best place',
    price: 1100,
    ownerId: 1
  },
  {
    address: '10 Capitol Drive',
    city: 'Milpitas',
    state: 'Ohio',
    country: 'USA',
    lat: 11.99,
    lng: 11.3,
    name: 'The Wall',
    description: 'Climb around here!',
    price: 233,
    ownerId: 2
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
