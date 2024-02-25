export class PokemonDTO {
  readonly id?: number;
  readonly treinador: string;
  readonly tipo: string;
  readonly nivel: number;

  constructor({ id, trainer, type, level }: PokemonDTO.Params) {
    this.id = id;
    this.treinador = trainer;
    this.tipo = type;
    this.nivel = level;
  }
};

export namespace PokemonDTO {
  export type Params = {
    id?: number;
    trainer: string;
    type: string;
    level: number;
  };
}