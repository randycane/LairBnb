'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'shinichiro@user.io',
        username: 'shinichiro',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'manjiro@user.io',
        username: 'mikey',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'emmasano.io',
        username: 'emmasano',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
