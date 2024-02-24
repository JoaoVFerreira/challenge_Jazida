'use strict';

// Populate pokemons table

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert('pokemons', pokemons, { transaction });
    });
  },

  async down (queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('pokemons', { tipo: pokemons.map(({ tipo }) => tipo) }, { transaction });
    });
  }
};

const pokemons = [
  { tipo: "Pikachu", treinador: "Thiago", nivel: 1, created_at: new Date(), updated_at: new Date() },
  { tipo: "Bulbasaur", treinador: "Ash", nivel: 3, created_at: new Date(), updated_at: new Date() },
  { tipo: "Charizard", treinador: "Misty", nivel: 1, created_at: new Date(), updated_at: new Date() },
  { tipo: "Squirtle", treinador: "Brock", nivel: 2, created_at: new Date(), updated_at: new Date() },
  { tipo: "Jigglypuff", treinador: "Jessie", nivel: 4, created_at: new Date(), updated_at: new Date() },
  { tipo: "Snorlax", treinador: "Gary", nivel: 9, created_at: new Date(), updated_at: new Date() },
  { tipo: "Blastoise", treinador: "Serena", nivel: 6, created_at: new Date(), updated_at: new Date() },
  { tipo: "Mewtwo", treinador: "Red", nivel: 1, created_at: new Date(), updated_at: new Date() },
  { tipo: "Gyarados", treinador: "Lance", nivel: 8, created_at: new Date(), updated_at: new Date() },
  { tipo: "Machop", treinador: "Bruno", nivel: 2, created_at: new Date(), updated_at: new Date() }
];
