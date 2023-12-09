import { useEffect, useState } from "react"
import { CentralizerContainer } from "../memComponents/CentralizerContainer"
import { EstagioCard } from "../memComponents/EstagioCard"
import { InfoTextHover } from "../memComponents/InfoText"
import { SingleDate } from "../memComponents/InputSingleDate"
import { api } from "@/utils/services"
import { Icons } from "../memComponents/Icons"
import { differenceInDays, toDate } from "date-fns"
import { useToast } from "../ui/use-toast"
import { OpeningI } from "@/utils/types/vagaI"
import { useSignin } from "@/hook/useSignin"


export const HomeMedico = () => {
    const { user } = useSignin()
    const [allVagas, setAllVagas] = useState<OpeningI[]>([])
    const [confirmados, setConfirmados] = useState<OpeningI[]>([])
    const [aberto, setAberto] = useState<OpeningI[]>([])
    const [finalizado, setFinalizado] = useState<OpeningI[]>([])
    const [load, setLoading] = useState(true)
    const { toast } = useToast();
    const [filters, setFilters] = useState({initial: null, finish: null, semestre: null})


    function handleInitial(e:any){
      setFilters({...filters, initial: e})
      return
    }
  
    function handleFinal(e:any){

      if(filters.initial) {
        const dataInicial = toDate(filters.initial)
        const dataFinal = toDate(e)
        console.log(differenceInDays(dataFinal, dataInicial))
        if(differenceInDays(dataFinal, dataInicial) >= 0){
          setFilters({...filters, finish: e})
        }
        else {
          toast({
            title: "Data Final Incorreta!",
            description:
              "A data final deve ser maior que a data inicial",
            icon: "alert",
          });
        }

      } else {
        setFilters({...filters, finish: e})
      }
      
      return
    }

    useEffect(() => { 
      const openings = user?.openings
      setAllVagas(openings)
      setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

   return (
      <CentralizerContainer outhers={"pt-[5.5rem] "}>
        <div className="w-full">

          <div className=" rounded-lg border bg-card text-card-foreground shadow-sm flex  flex-wrap items-center justify-around md:justify-start gap-2 w-full p-2 my-2">
            <div>
              <p>Filtros:</p>
            </div>
            <div className="py-1 sm:py-0">
              <SingleDate
                value={filters.initial}
                label="Data Inicial:"
                setValue={handleInitial}
              />
            </div>
            <div className="py-1 sm:py-0">
              <SingleDate
                value={filters.finish}
                label="Data Final:"
                setValue={handleFinal}
              />
            </div>
          </div>
          {load ? (
            <div className="w-full h-full pt-10 flex justify-center ">
              <div className=" w-20">
                <Icons.spinner className="mr-2 h-12 w-12 animate-spin" />
              </div>
            </div>
          ) : 
            (
              allVagas.map((vaga, idx) => 
              <EstagioCard
                key={idx}
                area={vaga?.speciality?.name}
                time={vaga?.total_hours}
                bairro={vaga?.location?.address?.neighbourhood}
                cidade={vaga?.location?.address?.city}
                estado={vaga?.location?.address?.federative_unit_st}
                atividades={vaga?.activities}
                id={vaga?.id}
                semestreMin={vaga?.school_term_min}
                initialDate={vaga.start_date ? new Date(vaga?.start_date) : 123}
                finishDate={vaga.end_date ? new Date(vaga.end_date) : 123}
                statusInscricao={vaga.status}
                dueDate={vaga.due_date ? new Date(vaga.due_date) : 123}
                userType={user?.scope}
                />)
            )
          /*(
            <div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
                <InfoTextHover
                  title={"Estágios em Aberto"}
                  description={
                    "Estágios cadastrados que ainda não foram aprovados pela MEM."
                  }
                />

                <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
                  {aberto.length > 0 ? (
                    aberto?.map((x, idx) => (
                      <EstagioCard
                        key={idx}
                        area={x.area}
                        time={x.time}
                        bairro={x.bairro}
                        cidade={x.cidade}
                        estado={x.estado}
                        type={x.type}
                        semestreMin={x.semestreMin}
                        initialDate={Date.parse(x.initialDate)}
                        finishDate={Date.parse(x.finishDate)} />
                    ))
                  ) : (
                    <div className="h-[20rem] flex justify-center items-center w-full">
                      <p>Você não possuí estágios nesta sessão.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
                <InfoTextHover
                  title={"Estágios Confirmados"}
                  description={
                    "Estágios que foram confirmados e já estão disponíveis para inscrição"
                  }
                />

                <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
                  {confirmados.length > 0 ? (
                    confirmados?.map((x, idx) => (
                      <EstagioCard
                      key={idx}
                      area={x.area}
                      time={x.time}
                      bairro={x.bairro}
                      cidade={x.cidade}
                      estado={x.estado}
                      type={x.type}
                      semestreMin={x.semestreMin}
                      initialDate={Date.parse(x.initialDate)}
                      finishDate={Date.parse(x.finishDate)} 
                      />
                    ))
                  ) : (
                    <div className="h-[20rem] flex justify-center items-center w-full">
                      <p>Você não possuí estágios nesta sessão.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
                <InfoTextHover
                  title={"Seleção Finalizada"}
                  description={
                    "Estágios que a seleção já foi finalizada e o candidato já está escolhido."
                  }
                />

                <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
                  {finalizado.length > 0 ? (
                    finalizado?.map((x, idx) => (
                      <EstagioCard
                      key={idx}
                      area={x.area}
                      time={x.time}
                      bairro={x.bairro}
                      cidade={x.cidade}
                      estado={x.estado}
                      type={x.type}
                      semestreMin={x.semestreMin}
                      initialDate={Date.parse(x.initialDate)}
                      finishDate={Date.parse(x.finishDate)} 
                      />
                    ))
                  ) : (
                    <div className="h-[20rem] flex justify-center items-center w-full">
                      <p>Você não possuí estágios nesta sessão.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
                <InfoTextHover
                  title={"Todos os Estágios"}
                  description={"Todos os estágios cadastrados até agora."}
                />

                <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
                  {allVagas.length > 0 ? (
                    allVagas?.map((x, idx) => (
                      <EstagioCard
                      key={idx}
                      area={x.area}
                      time={x.time}
                      bairro={x.bairro}
                      cidade={x.cidade}
                      estado={x.estado}
                      type={x.type}
                      semestreMin={x.semestreMin}
                      initialDate={Date.parse(x.initialDate)}
                      finishDate={Date.parse(x.finishDate)} 
                      />
                    ))
                  ) : (
                    <div className="h-[20rem] flex justify-center items-center w-full">
                      <p>Você não possuí estágios nesta sessão.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
                  )*/}
                  
        </div>
      </CentralizerContainer>
    )
}