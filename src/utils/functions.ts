export const validarOpcaoUnica = (valor: string, opcs: any[]) => {
    return opcs.filter(x => 
        x.label == valor
      )[0].value
}