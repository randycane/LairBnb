'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Shinichiro',
        lastName: 'Sano',
        email: 'shinichiro@user.io',
        username: 'shinichiro',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Manjiro',
        lastName: 'Sano',
        email: 'manjiro@user.io',
        username: 'mikey',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Emma',
        lastName: 'Sano',
        email: 'emmasano@user.io',
        username: 'emmasano',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Izana',
        lastName: 'Kurokawa',
        email: 'izana@user.io',
        username: 'izana',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Takashi',
        lastName: 'Mitsuya',
        email: 'mitsuya@user.io',
        username: 'mitsuya',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['shinichiro', 'manjiro', 'emmasano', 'izana', 'kazutora'] }
    }, {});
  }
};
