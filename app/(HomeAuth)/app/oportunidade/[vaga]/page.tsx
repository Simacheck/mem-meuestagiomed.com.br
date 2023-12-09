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
import { OpeningI } from "@/utils/types/vagaI";
import { format } from "date-fns";
import { DetalhesMedico } from "@/components/pages/DetalhesVagaMedico";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: {
    vaga: string;
  };
}

export default function VagaPage({ params }: Props) {
  const { user } = useSignin();
  const [load, setLoading] = useState(true);
  const [vaga, setVaga] = useState<OpeningI>();

  async function getDados(data: string) {
    await api.get(`/opening/${data}`).then((r) => {
      setVaga(r.data);
    });

    return;
  }

  useEffect(() => {
    setLoading(true);
    getDados(params.vaga);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  console.log(vaga);
  (() => {
    switch (vaga?.status) {
      case "active":
        return console.log("ativo", vaga?.status);
      default:
        return console.log("inativo", vaga?.status);
    }
  })();

  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      {!load && (
        <div className="w-full">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
            <div className="py-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-3xl">{vaga?.name}</h2>
                {vaga?.status !== "finished" && vaga?.status !== "canceled" && (
                  <Link
                    className="rounded-lg border p-2"
                    href={`/app/oportunidade/edit/${vaga?.id}`}
                  >
                    Editar
                  </Link>
                )}
              </div>
              {vaga?.status == "active" ? (
                <Badge>Inscrições Abertas</Badge>
              ) : (
                <Badge>Inscrições Fechadas</Badge>
              )}

              {vaga?.status == "finished" && (
                <Badge variant={"outline"}>Seleção Finalizada</Badge>
              )}
            </div>
            <div className="flex flex-wrap w-full items-center gap-4">
              <div>
                <h3 className="text-lg">
                  Cidade: {vaga?.location?.address?.city} -{" "}
                  {vaga?.location?.address?.federative_unit_st}
                </h3>
              </div>
              <div>
                <h3 className="text-lg">
                  Bairro: {vaga?.location?.address?.neighbourhood}
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap w-full items-center gap-4">
              <div>
                <h3 className="text-lg">
                  De:{" "}
                  {vaga?.start_date &&
                    format(Date.parse(vaga?.start_date), "dd/MM/yyyy")}
                </h3>
              </div>
              <div>
                <h3 className="text-lg">
                  Até:{" "}
                  {vaga?.end_date &&
                    format(Date.parse(vaga?.end_date), "dd/MM/yyyy")}
                </h3>
              </div>
              <div>
                <h3 className="text-lg">
                  Carga Horária: {vaga?.total_hours} horas
                </h3>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap w-full items-center gap-4">
              <div>
                <h2 className="text-xl ">Descrição:</h2>
              </div>
            </div>
            <div>
              <p>{vaga?.description}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
                <div>
                  <h2 className="text-xl ">Atividades Programadas:</h2>
                </div>
                <div className="flex gap-1">
                  {vaga?.activities?.map((x, idx) => (
                    <Badge key={idx} variant="outline" className="p-2">
                      {x.name}
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
                    {vaga?.school_term_min}º Semestre Mínimo
                  </Badge>
                  <Badge variant="outline" className="p-2">
                    {vaga?.school_term_min}º Semestre Máximo
                  </Badge>
                </div>
              </div>
            </div>
            {user?.scope === "medic" ? (
              <DetalhesMedico details={vaga} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </CentralizerContainer>
  );
}
