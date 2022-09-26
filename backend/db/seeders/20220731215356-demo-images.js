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
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-39563416/original/486128e9-7020-4b07-97c0-8f4fbe21e27a.jpeg?im_w=1200",
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
  },
  {
    spotId: 6,
      reviewId: 10,
      previewImage: true,
      url: 'https://a0.muscache.com/im/pictures/8b49998c-569b-498d-8946-820a1a9f8633.jpg?im_w=1200',
      userId: 2
    },
    {
    spotId: 7,
    reviewId: 9,
    previewImage: true,
      url: "https://a0.muscache.com/im/pictures/c7f4f024-1561-4495-ab7d-8525264178e4.jpg?im_w=1200",
      userId: 3,
    },
    {
      spotId: 8,
      reviewId: 6,
      previewImage: true,
      url: "https://a0.muscache.com/im/pictures/f520fa7c-ff9f-4e93-a815-08cd2a0d8a57.jpg?im_w=960",
      userId:4,
    },
    {
      spotId: 9,
      reviewId: 8,
      previewImage: true,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-651470635531100051/original/59d618ce-1cfd-442e-8df9-add6401ed004.jpeg?im_w=960",
      userId: 5,
    },
    {
      spotId: 10,
      reviewId: 7,
      previewImage: true,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-580351555068335274/original/94994b90-eab4-4e51-950f-07909eb24dce.jpeg?im_w=960",
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
