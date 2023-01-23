'use strict';

const validImages = [
  {
  spotId: 1,
    reviewId: 1,
    previewImage: true,
    url: 'https://styles.redditmedia.com/t5_icx0v/styles/image_widget_8hcjsurlnrx01.jpg?format=pjpg&s=cf0261f0c5e2810adb1d7dde7277792c7c130094',
    userId: 2
  },
  {
  spotId: 2,
  reviewId: 2,
  previewImage: true,
    url: "https://external-preview.redd.it/qF1F11UWEbYTJS3RdHsNWk4Hpgn25kyXm8XUF0Thq2c.jpg?auto=webp&s=af797e98edf9528c9f3f2f9114a280a409eb64c7",
    userId: 3,
  },
  {
    spotId: 3,
    reviewId: 3,
    previewImage: true,
    url: "https://qph.cf2.quoracdn.net/main-qimg-65f0b501ee1b349c20df1a19c596c1fb-pjlq",
    userId:4,
  },
  {
    spotId: 4,
    reviewId: 5,
    previewImage: true,
    url: "https://media-cdn.tripadvisor.com/media/photo-s/18/1d/e4/72/photo2jpg.jpg",
    userId: 5,
  },
  {
    spotId: 5,
    reviewId: 4,
    previewImage: true,
    url: "https://i.pinimg.com/originals/9d/7b/a8/9d7ba8b2d9174aafe1cafc10f6fe9ce6.jpg",
    userId: 1
  },
  {
    spotId: 6,
      reviewId: 10,
      previewImage: true,
      url: 'http://pm1.narvii.com/6283/65cc4de7cb61da63ea45bbe88a07327633e4c426_00.jpg',
      userId: 2
    },
    {
    spotId: 7,
    reviewId: 9,
    previewImage: true,
      url: "https://pbs.twimg.com/media/EyOhe2IUYAcg8c-?format=jpg&name=large",
      userId: 3,
    },
    {
      spotId: 8,
      reviewId: 6,
      previewImage: true,
      url: "https://i.pinimg.com/originals/79/fb/05/79fb058f9b10733aa4460a26443a5873.jpg",
      userId:4,
    },
    {
      spotId: 9,
      reviewId: 8,
      previewImage: true,
      url: "https://qph.cf2.quoracdn.net/main-qimg-642af5926920a8dacd67632ef288f2fb-lq",
      userId: 5,
    },
    {
      spotId: 10,
      reviewId: 7,
      previewImage: true,
      url: "https://api.time.com/wp-content/uploads/2017/08/game-of-thrones-the-wall-history-03.jpg",
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
