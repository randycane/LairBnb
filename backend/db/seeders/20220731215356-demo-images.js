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
    url: "https://images.adsttc.com/media/images/5def/0114/3312/fdec/ff00/0046/newsletter/09-observatory.jpg?1575944451",
    userId: 3,
  },
  {
    spotId: 3,
    reviewId: 3,
    previewImage: true,
    url: "https://i.pinimg.com/originals/bf/22/40/bf224055548de62948cfbc70e57f37fe.jpg",
    userId:4,
  },
  {
    spotId: 4,
    reviewId: 5,
    previewImage: true,
    url: "https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Ft8x5kxv6t2ez4ht76vvg6zj5p3i215&option=N&h=472&permitphotoenlargement=false",
    userId: 5,
  },
  {
    spotId: 5,
    reviewId: 4,
    previewImage: true,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrE6f28oWB6Nd-sZNpeialVE3Zx_9pSUuPQ&usqp=CAU",
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
