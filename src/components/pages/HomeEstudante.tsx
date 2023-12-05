import { useEffect, useState } from "react";
import { CentralizerContainer } from "../memComponents/CentralizerContainer";
import { EstagioCard } from "../memComponents/EstagioCard";
import { api } from "@/utils/services";
import { differenceInDays, toDate } from "date-fns";
import { useToast } from "../ui/use-toast";
import { VagaI } from "@/utils/types/vagaI";
import { SelectFilter } from "../memComponents/SelectFilter";
import { RangeDatePicker } from "../memComponents/RangeDatePicker";

export const HomeEstudante = () => {
  const [allVagas, setAllVagas] = useState<VagaI[]>([]);
  const [aberto, setAberto] = useState<VagaI[]>([]);
  const [load, setLoading] = useState(true);
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    initial: null,
    finish: null,
    semestre: null,
  });

  async function getDados(user?: string) {
    setAllVagas([]);

    console.log(aberto);
    await api.get("/vagas/all").then((r) => {
      setAllVagas(r.data);
    });

    return;
  }

  function handleInitial(e: any) {
    setFilters({ ...filters, initial: e });
    return;
  }

  function handleFinal(e: any) {
    if (filters.initial) {
      const dataInicial = toDate(filters.initial);
      const dataFinal = toDate(e);
      console.log(differenceInDays(dataFinal, dataInicial));
      if (differenceInDays(dataFinal, dataInicial) >= 0) {
        setFilters({ ...filters, finish: e });
      } else {
        toast({
          title: "Data Final Incorreta!",
          description: "A data final deve ser maior que a data inicial",
          icon: "alert",
        });
      }
    } else {
      setFilters({ ...filters, finish: e });
    }

    return;
  }

  useEffect(() => {
    setLoading(true);
    getDados();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, filters]);

  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <div className="py-2">
          <h2 className="text-3xl">Oportunidadessssss:</h2>
        </div>
        <div className=" rounded-lg border bg-card text-card-foreground shadow-sm flex  flex-wrap items-center justify-around md:justify-start gap-2 w-full p-2 my-2">
          <div>
            <p>Filtros:</p>
          </div>
          <div className="py-1 sm:py-0">
            <SelectFilter
              itens={[
                { value: "ord", label: "Dermatologia" },
                { value: "rd", label: "Psiquiatria" },
              ]}
              placeholder={"Especialidade"}
            />
          </div>

          <div className="py-1 sm:py-0">
            <RangeDatePicker />
          </div>

          <div className="py-1 sm:py-0">
            <SelectFilter
              itens={[
                { value: "1s", label: "1º Semestre" },
                { value: "2s", label: "2º Semestre" },
              ]}
              placeholder={"Semestre Mínimo"}
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-2 justify-center sm:justify-evenly">
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
                statusInscricao={x.inscricoesStatus}
              />
            ))
          ) : (
            <div className="h-[20rem] flex justify-center items-center w-full">
              <p>Você não possuí estágios nesta sessão.</p>
            </div>
          )}
        </div>
      </div>
    </CentralizerContainer>
  );
};
