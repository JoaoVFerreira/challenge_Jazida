export class PokemonEntity {
  readonly id?: number;
  readonly type: string;
  readonly trainer: string;
  readonly level: number;

  constructor(data: PokemonEntity.Params) {
    this.id = data.id;
    this.type = data.tipo;
    this.trainer = data.treinador;
    this.level = data.nivel;
  }
}

export namespace PokemonEntity {
  export type Params = {
    id?: number;
    tipo: string;
    treinador: string;
    nivel: number;
  };
}
