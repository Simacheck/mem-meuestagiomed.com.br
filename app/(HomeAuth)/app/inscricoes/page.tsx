import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { SelectFilter } from "@/components/memComponents/SelectFilter";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoTextHover } from "@/components/memComponents/InfoText";

export default function Signin() {
  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <div className="py-2">
          <h2 className="text-3xl">Minhas Inscricoes:</h2>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <InfoTextHover title={"Processos Finalizados"} description={"abc"} />

          <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <InfoTextHover title={"Processos em Análise"} description={"abc"} />
          <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
            <EstagioCard />
          </div>
        </div>
        <div className=" rounded-lg border bg-card text-card-foreground shadow-sm flex  flex-wrap items-center justify-around md:justify-start gap-2 w-full p-2 my-2">
          <InfoTextHover title={"Processos em Aberto"} description={"abc"} />

          <div className="flex w-full gap-2 justify-left overflow-x-auto  ">
            <EstagioCard />
            <EstagioCard />
          </div>
        </div>
      </div>
    </CentralizerContainer>
  );
}
