import { factory, SequelizeAdapter } from 'factory-girl';
import model from '$models';
import { faker } from '@faker-js/faker';

factory.setAdapter(new SequelizeAdapter());

factory.define('Pokemon', model.pokemons, {
  tipo: faker.helpers.arrayElement(['Mewtwo', 'Charizard', 'Articuno', 'Dragonite', 'Evee']),
  treinador: faker.person.fullName(),
  nivel: faker.number.int().toString().slice(0, 3)
});

factory.build('Pokemon');

export default factory;
