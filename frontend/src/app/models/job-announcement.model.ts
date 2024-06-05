import { Skill } from './skill.model';
import { JobSector } from './job-sector.model';

export class JobAnnouncement {
  id: number;
  titulo: string;
  ramo_id: number;
  descricao: string;
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
  empresa_id: number;

  competencias: Skill[] = [];
  ramo: JobSector = null;

  constructor({
    id = null,
    titulo = null,
    ramo_id = null,
    descricao = null,
    competencias = [],
    experiencia = null,
    salario_min = null,
    salario_max = null,
    ativo = null,
    empresa_id = null,
    ramo = null,
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.ramo_id = ramo_id;
    this.experiencia = experiencia;
    this.salario_max = salario_max;
    this.salario_min = salario_min;
    this.ativo = ativo;
    this.empresa_id = empresa_id;
    this.competencias = competencias.map((c) => new Skill(c));
    this.ramo = ramo;
  }

  get createData() {
    return {
      ramo_id: this.ramo_id,
      titulo: this.titulo,
      descricao: this.descricao,
      competencias: this.competencias.map((c) => new Skill(c).request_data),
      experiencia: this.experiencia,
      salario_max: this.salario_max,
      salario_min: this.salario_min,
      ativo: this.ativo,
    };
  }

  get updateData() {
    return {
      id: this.id,
      ramo_id: this.ramo_id,
      titulo: this.titulo,
      descricao: this.descricao,
      competencias: this.competencias.map((c) => new Skill(c).request_data),
      experiencia: this.experiencia,
      salario_max: this.salario_max,
      salario_min: this.salario_min,
      ativo: this.ativo,
    };
  }
}
