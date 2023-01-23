'use strict';

const validSpots = [
  {
    address: '1 Old Street',
    city: 'San Diego',
    state: 'California',
    country: 'USA',
    lat: 45.99,
    lng: 42.3,
    name: 'High Tower',
    description: 'Beautiful old regal building',
    price: 300,
    ownerId: 2
  },
  {
    address: '211 Reach Street',
    city: 'South San Francisco',
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
    city: 'Ukiah',
    state: 'California',
    country: 'USA',
    lat: 98.99,
    lng: 20.3,
    name: 'Craster Keep',
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
    name: 'Casterly Rock',
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
    name: 'Eastwatch By The Sea',
    description: 'Bring all your friends here',
    price: 247,
    ownerId: 4
  },
  {
    address: '6 Stone Way',
    city: 'San Jose',
    state: 'California',
    country: 'USA',
    lat: 44.99,
    lng: 40.3,
    name: 'Riverrun',
    description: 'Boulders and water galore, enjoy the view.',
    price: 3000,
    ownerId: 5
  },
  {
    address: '7 Julie Drive',
    city: 'Cupertino',
    state: 'California',
    country: 'USA',
    lat: 89.99,
    lng: 19.3,
    name: 'Lannisport',
    description: 'For the brave and noble people.',
    price: 900,
    ownerId: 4
  },
  {
    address: '8 Commercial Street',
    city: 'San Luis Obispo',
    state: 'California',
    country: 'USA',
    lat: 99.99,
    lng: 27.3,
    name: 'Red Keep',
    description: 'For the luxury lovers.',
    price: 1000,
    ownerId: 3
  },
  {
    address: '9 Kentucky Way',
    city: 'Portland',
    state: 'Oregon',
    country: 'USA',
    lat: 30.99,
    lng: 39.3,
    name: 'Winterfell',
    description: 'Home of the first hosts!',
    price: 1100,
    ownerId: 1
  },
  {
    address: '10 Cimarron Drive',
    city: 'Seattle',
    state: 'Washington',
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
