export interface VagaI {
  id: string;
  area: string;
  time: string;
  locale: string;
  type: string;
  bairro: string;
  semestreMin: string;
  dataFinalInscricao: string;
  initialDate: string;
  finishDate: string;
  descricao: string;
  infoMedico?: InfoMedicoI;
  atividades?: string[];
  requisitos?: string[];
  situacao: string;
}
export interface InfoMedicoI {
  qtdeInscritos: number;
  status: boolean;
  inscritos: InscritoI[];
  selecionado?: InscritoI;
}

export interface InscritoI {
  id: number;
  nome: string;
  faculdade: string;
  periodo: string;
  currículo: string;
  discricao: string;
  cidade: string;
  areas: string[];
  celular?: string;
  email?: string;
  status?: string;
}
