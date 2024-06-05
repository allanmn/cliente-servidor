export class JobSector {
  id: number;
  nome: string;
  descricao: string;

  constructor({ id = null, nome = null, descricao = null }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }

  get request_data() {
    return {
      id: this.id,
      nome: this.nome,
      descricap: this.descricao,
    };
  }
}
