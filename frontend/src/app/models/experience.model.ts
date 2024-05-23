import * as moment from 'moment';

export class Experience {
  id: number;
  nome_empresa: string;
  inicio: moment.Moment;
  fim: moment.Moment;
  cargo: string;
  user_id: number;

  constructor({
    id = null,
    nome_empresa = null,
    inicio = null,
    fim = null,
    cargo = null,
    user_id = null,
  }) {
    this.id = id;
    this.nome_empresa = nome_empresa;
    this.inicio = inicio;
    this.fim = fim;
    this.cargo = cargo;
    this.user_id = user_id;
  }

  get request_data() {
    return {
      id: this.id,
      nome_empresa: this.nome_empresa,
      inicio: this.inicio,
      fim: this.fim,
      cargo: this.cargo,
    };
  }
}
