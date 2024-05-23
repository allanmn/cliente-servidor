import { Experience } from './experience.model';
import { Skill } from './skill.model';

export class User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  ramo: string;
  descricao: string;
  tipo: string;

  competencias: Skill[] = [];

  experiencia: Experience[] = [];

  constructor({
    id = null,
    nome = null,
    email = null,
    senha = null,
    ramo = null,
    descricao = null,
    tipo = null,
    competencias = [],
    experiencia = [],
  }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.ramo = ramo;
    this.descricao = descricao;
    this.tipo = tipo;
    this.competencias = competencias.map((c) => new Skill(c));
    this.experiencia = experiencia;
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
      ramo: this.ramo,
      descricao: this.descricao,
    };
  }

  get update_me() {
    if (this.tipo === 'empresa') {
      return {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        ramo: this.ramo,
        descricao: this.descricao,
      };
    }

    return {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      competencias: this.competencias.map((c) => new Skill(c).request_data),
      experiencia: this.experiencia.map((e) => new Experience(e).request_data),
    };
  }
}
