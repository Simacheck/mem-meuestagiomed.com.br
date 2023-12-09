import { deleteCookie, getCookie } from "cookies-next"
import { api } from "./services"
import { redirect } from "next/navigation"
import { TypesI } from "./types/vagaI"

export const validarOpcaoUnica = (valor: string, opcs: any[]) => {

  console.log(valor, opcs)
    return opcs.filter(x => 
        x.label == valor
      )[0].value
}

export const optionsSelects = (arr: any[], chaveValue: string, chaveLabel: string) => {
  return arr.map(x => ({'value': x[chaveValue], 'label': x[chaveLabel] }))
}

export async function signOut() {
  const accessToken = getCookie('mem.accessToken');

  if(accessToken){
      deleteCookie('mem.accessToken')
      deleteCookie('mem.refreshToken')
      deleteCookie('mem.idToken')

      
      await api
          .post("/auth/logout")
          .then(e => redirect('/abc'))
          .catch(e => console.log(e))
  }

  return
}

interface AdaptadoI {
  name: string;
  id: string;
}

export const enumTypeObj = (strings: string[]): TypesI[] => {
  const novoObj = strings.map((x, idx) => {return({id: idx.toString(), name: x})})
  
  console.log(strings, novoObj)
  return novoObj
}