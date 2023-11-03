'use client'

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

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

interface Props {
  situation?: "closed" | "maturity" | "selected" | "notSelected";
}

export function EstagioCard({ situation }: Props) {
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
        <CardTitle>Estágio em Dermatologia</CardTitle>
        <CardDescription className="flex gap-2">
          <Badge>Dermatologia</Badge>
          <Badge>60hrs</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Localização</p>
            <div>
              <p className="text-lg  text-muted-foreground">
                Vila Olímpia - São Paulo - SP
              </p>
            </div>
          </div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Tipo de Estágio</p>
            <div>
              <p className="text-lg  text-muted-foreground">
                Clínica Particular
              </p>
            </div>
          </div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Semestre Mínimo:</p>
            <div>
              <p className="text-lg  text-muted-foreground">6º Semestre</p>
            </div>
          </div>
          <div className="flex flex-row mb-1 pb-2 ">
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">De</p>
              <div>
                <p className="text-lg  text-muted-foreground">15/08/23</p>
              </div>
            </div>
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">Ate</p>
              <div>
                <p className="text-lg  text-muted-foreground">15/08/23</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push("/app/estagio/endocrino")}
        >
          Ver mais informações
        </Button>
      </CardFooter>
    </Card>
  );
}
