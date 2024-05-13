export class Skill {
  id: number;
  nome: string;

  constructor({ id = null, nome = null }) {
    this.id = id;
    this.nome = nome;
  }

  get request_data() {
    return {
      id: this.id,
      nome: this.nome,
    };
  }
}
