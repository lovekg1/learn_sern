'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'lehoanganh0895@gmail.com',
      password: 'asdasd',
      firstName: 'Hoang',
      lastName: 'Anh',
      address: 'VN',
      gender: 1,
      phonenumber: '0123456789',
      image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      roleId: 'R1',
      positionId: 'P0',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
