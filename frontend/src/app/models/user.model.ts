export class User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  ramo: string;
  descricao: string;
  tipo: string;

  constructor({
    id = null,
    nome = null,
    email = null,
    senha = null,
    ramo = null,
    descricao = null,
    tipo = null,
  }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.ramo = ramo;
    this.descricao = descricao;
    this.tipo = tipo;
  }

  get is_company(): boolean {
    return this.tipo === 'empresa';
  }

  get create_candidato_data() {
    return {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };
  }

  get create_empresa_data() {
    return {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      ramo: this.descricao,
      descricao: this.descricao,
    };
  }
}
