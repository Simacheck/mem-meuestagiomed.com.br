"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import format from "date-fns/format";

interface Props {
  situation?: "closed" | "maturity" | "selected" | "notSelected";
  area: string;
  time: string;
  type: string;
  semestreMin: string;
  initialDate: number;
  finishDate: number;
  bairro: string;
  cidade: string;
  estado: string;
  statusInscricao: string;
}

export function EstagioCard({
  situation,
  area,
  time,
  bairro,
  cidade,
  estado,
  type,
  semestreMin,
  initialDate,
  finishDate,
  statusInscricao
}: Props) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "w-full sm:min-w-[380px] md:min-w-[314px] sm:max-w-[380px] md:max-w-[314px]  flex flex-col justify-between"
      )}
    >
      {situation === "selected" && (
        <div className="w-full bg-green-200 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Você foi selecionado!</p>
          <p>Clique e entre em contato agora!</p>
        </div>
      )}
      {situation === "notSelected" && (
        <div className="w-full bg-gray-200 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Não foi desta vez..</p>
          <p>Sentimos muito por isso.</p>
        </div>
      )}
      {situation === "closed" && (
        <div className="w-full bg-gray-400 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Inscrições encerradas!</p>
          <p>Últimos dias para se inscrever!</p>
        </div>
      )}
      {situation === "maturity" && (
        <div className="w-full bg-red-100 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Inscreva-se já!</p>
          <p>Últimos dias para se inscrever!</p>
        </div>
      )}
      <CardHeader>
        <CardTitle>Estágio em {area}</CardTitle>
        <CardDescription className="flex gap-2">
          <Badge>{area}</Badge>
          <Badge>{time}hrs</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Localização</p>
            <div>
              <p className="text-lg  text-muted-foreground">
                {bairro} - {cidade} - {estado}
              </p>
            </div>
          </div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Tipo de Estágio</p>
            <div>
              <p className="text-lg  text-muted-foreground">{type}</p>
            </div>
          </div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Semestre Mínimo:</p>
            <div>
              <p className="text-lg  text-muted-foreground">
                {semestreMin}º Semestre
              </p>
            </div>
          </div>
          <div className="flex flex-row mb-1 pb-2 ">
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">De</p>
              <div>
                <p className="text-lg  text-muted-foreground">
                  {initialDate && format(initialDate, "d/MM/yyyy")}
                </p>
              </div>
            </div>
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">Ate</p>
              <div>
                <p className="text-lg  text-muted-foreground">
                  {finishDate && format(finishDate, "d/MM/yyyy")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mb-1 pb-2 ">
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">Inscrições:</p>
              <div>
                <p className="text-lg  text-muted-foreground">{statusInscricao === 'aberto' ? <Badge>Abertas</Badge> : <Badge variant={'outline'}>Fechadas</Badge>}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push("/app/oportunidade/endocrino")}
        >
          Ver mais informações
        </Button>
      </CardFooter>
    </Card>
  );
}
