

export interface EstagioSchema{
    situation: "closed" | "maturity" | "selected" | "notSelected";
    estagioName: string; //aqui podemos colocar o resumo da área, por ex, Estágio em Hospital
    area: string;
    horasTotais: string;
    local: string; //cidade, estado, bairro
    tipoDeClinica: string;
    minSemestre: string | number;
    dateStart: string;
    dataEnd: string;
    situationInscricao: situationInsc;
} 

export interface EstagioDetalhesSchema{
    situation: "closed" | "maturity" | "selected" | "notSelected";
    estagioName: string; //aqui podemos colocar o resumo da área, por ex, Estágio em Hospital
    area: string;
    horasTotais: string;
    local: string; //cidade, estado, bairro
    tipoDeClinica: string;
    minSemestre: string | number;
    dateStart: string;
    dataEnd: string;
    descricao: string;
    atividadesProgramadas: [string];
    requisitos: [string];
} 

export interface situationInsc {
    situation: "emAnalise" | "selecionado" | "negado"
}