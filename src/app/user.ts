export class User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string;
  escolaridade: Escolaridade;
  historicoEscolar: HistoricoEscolar;
}

export class UserRequest {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string;
  escolaridade: string;
}

export class Escolaridade {
  id: number;
  descricao: string;
}

export class HistoricoEscolar {
  id: number;
  nome: string;
  formato: string;
}

export const userInit: User = {
  id: 0,
  nome: '',
  sobrenome: '',
  email: '',
  dataNascimento: '',
  escolaridade: { id: 0, descricao: '' },
  historicoEscolar: { id: 0, nome: '', formato: '' }
}
