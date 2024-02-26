'use strict';

// Create table Pokemons

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'pokemons',
        {
          id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          tipo: {
            type: Sequelize.STRING,
            allowNull: false
          },
          treinador: Sequelize.STRING,
          nivel: Sequelize.INTEGER,
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        },
        { transaction }
      );
      await Promise.all([
        queryInterface.addIndex('pokemons', {
          fields: ['tipo'],
          name: 'pokemons_tipo_idx',
          transaction
        }),
        queryInterface.addIndex('pokemons', {
          fields: ['treinador'],
          name: 'pokemons_treinador_idx',
          transaction
        })
      ]); 
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.removeIndex('pokemons', {
          fields: ['tipo'],
          transaction
        }),
        queryInterface.removeIndex('pokemons', {
          fields: ['treinador'],
          transaction
        })
      ]);
      await queryInterface.dropTable('pokemons', { transaction });
    });
  }
};
