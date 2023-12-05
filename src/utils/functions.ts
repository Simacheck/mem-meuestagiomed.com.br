export const validarOpcaoUnica = (valor: string, opcs: any[]) => {

  console.log(valor, opcs)
    return opcs.filter(x => 
        x.label == valor
      )[0].value
}