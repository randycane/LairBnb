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
    ownerId: 2,
    //previewImage: "https://styles.redditmedia.com/t5_icx0v/styles/image_widget_8hcjsurlnrx01.jpg?format=pjpg&s=cf0261f0c5e2810adb1d7dde7277792c7c130094",
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
    ownerId: 5,
    //previewImage: "https://w0.peakpx.com/wallpaper/133/358/HD-wallpaper-massive-ancient-castle-grass-castle-wall-hill-turrets.jpg",
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
    ownerId: 3,
    //previewImage: "https://qph.cf2.quoracdn.net/main-qimg-65f0b501ee1b349c20df1a19c596c1fb-pjlq",
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
    ownerId: 1,
    //previewImage: "https://media-cdn.tripadvisor.com/media/photo-s/18/1d/e4/72/photo2jpg.jpg",
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
    ownerId: 4,
    //previewImage: "https://i.pinimg.com/originals/9d/7b/a8/9d7ba8b2d9174aafe1cafc10f6fe9ce6.jpg"
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
    ownerId: 5,
    //previewImage: "http://pm1.narvii.com/6283/65cc4de7cb61da63ea45bbe88a07327633e4c426_00.jpg"
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
    ownerId: 4,
    //previewImage: "https://pbs.twimg.com/media/EyOhe2IUYAcg8c-?format=jpg&name=large"
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
    ownerId: 3,
    //previewImage: "https://i.pinimg.com/originals/79/fb/05/79fb058f9b10733aa4460a26443a5873.jpg"
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
    ownerId: 1,
    //previewImage: "https://qph.cf2.quoracdn.net/main-qimg-642af5926920a8dacd67632ef288f2fb-lq"
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
    ownerId: 2,
    //previewImage: "https://api.time.com/wp-content/uploads/2017/08/game-of-thrones-the-wall-history-03.jpg"
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
