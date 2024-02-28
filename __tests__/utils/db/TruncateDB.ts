import model from '$models';

const PokemonModel = model.pokemons;

async function clearDatabase(table: string) {
  try {
    await PokemonModel.destroy({ truncate: true, cascade: true });
  } catch (error) {
    console.error(`Erro ao limpar a tabela ${table}:`, error);
    throw error;
  }
}
export default clearDatabase;