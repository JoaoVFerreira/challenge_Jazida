import { Model } from 'sequelize';

export class PokemonModel extends Model {
  declare id: number;
  declare tipo: string;
  declare treinador: string;
  declare nivel: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  static notHistory: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  PokemonModel.init(
    {
      tipo: DataTypes.STRING,
      treinador: DataTypes.STRING,
      nivel: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'pokemons'
    }
  );

  PokemonModel.notHistory = true;

  return PokemonModel;
};