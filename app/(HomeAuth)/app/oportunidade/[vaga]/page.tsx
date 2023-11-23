"use client";

import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { SelectFilter } from "@/components/memComponents/SelectFilter";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSignin } from "@/hook/useSignin";
import { useEffect, useState } from "react";
import { api } from "@/utils/services";
import { VagaI } from "@/utils/types/vagaI";
import { format } from "date-fns";
import { DetalhesMedico } from "@/components/pages/DetalhesVagaMedico";

export default function VagaPage() {
  const pathname = usePathname();
  const { user } = useSignin();
  const [load, setLoading] = useState(true);
  const [vaga, setVaga] = useState<VagaI>();

  async function getDados(data: string) {
    await api.get(`/vagas/${data}`).then((r) => {
      setVaga(r.data);
    });

    return;
  }

  useEffect(() => {
    const tamanho = "/app/oportunidade/".length;
    const novaString = pathname.substring(tamanho, pathname.length);

    setLoading(true);
    getDados(novaString);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  console.log(vaga)
  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      {
        !load &&

      
      <div className="w-full">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <div className="py-2">
            <h2 className="text-2xl">
              Oportunidade em{" "}
              <span className="font-bold text-3xl">{vaga?.area}</span>
            </h2>
            {user?.userType == "medico" ? (
              (() => {
                switch (vaga?.situacao) {
                  case 'aberto':
                    return <Badge> Em Confirmação </Badge>
                  case 'confirmado':
                    return <Badge>Inscrições Abertas</Badge>
                  case 'finalizado':
                    return <Badge>Finalizado</Badge>
                  default:
                    return null
                }
              })()
              ) 
            : null}
          </div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">Cidade: {vaga?.locale}</h3>
            </div>
            <div>
              <h3 className="text-lg">Bairro: {vaga?.bairro}</h3>
            </div>
          </div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">
                De:{" "}
                {vaga?.initialDate &&
                  format(Date.parse(vaga?.initialDate), "d/MM/yyyy")}
              </h3>
            </div>
            <div>
              <h3 className="text-lg">
                Até:{" "}
                {vaga?.finishDate &&
                  format(Date.parse(vaga?.finishDate), "d/MM/yyyy")}
              </h3>
            </div>
            <div>
              <h3 className="text-lg">Carga Horária: {vaga?.time} horas</h3>
            </div>
          </div>
          <div className="pt-2 flex flex-wrap w-full items-center gap-4">
            <div>
              <h2 className="text-xl ">Descrição:</h2>
            </div>
          </div>
          <div>
            <p>{vaga?.descricao}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
              <div>
                <h2 className="text-xl ">Atividades Programadas:</h2>
              </div>
              <div className="flex gap-1">
                {vaga?.atividades?.map((x) => (
                  <Badge key={x} variant="outline" className="p-2">
                    {x}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
              <div>
                <h2 className="text-xl ">Requisitos:</h2>
              </div>
              <div>
                <Badge variant="outline" className="p-2">
                  {vaga?.semestreMin}º Semestre
                </Badge>
                {vaga?.requisitos?.map((x) => (
                  <Badge key={x} variant="outline" className="p-2">
                    {x}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {user?.userType === "medico" ? (
            <DetalhesMedico idVaga={vaga?.id} details={vaga?.infoMedico} />
          ) : (
            <div>sdfadsfa</div>
          )}
        </div>
      </div>
      }
    </CentralizerContainer>
  );
}
