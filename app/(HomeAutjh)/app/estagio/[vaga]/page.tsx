import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { SelectFilter } from "@/components/memComponents/SelectFilter";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function VagaPage() {
  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <div className="py-2">
            <h2 className="text-2xl">
              Vaga em{" "}
              <span className="font-bold text-3xl">
                Clínica de Endocrinologia
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">Cidade: SÃO PAULO - SP</h3>
            </div>
            <div>
              <h3 className="text-lg">Bairro: MOEMA</h3>
            </div>
          </div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">De: 15/12/2023</h3>
            </div>
            <div>
              <h3 className="text-lg">Até: 20/12/2023</h3>
            </div>
            <div>
              <h3 className="text-lg">Carga Horária: 120 horass</h3>
            </div>
          </div>
          <div className="pt-2 flex flex-wrap w-full items-center gap-4">
            <div>
              <h2 className="text-xl ">Descrição:</h2>
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              lobortis fermentum vestibulum. Vestibulum sagittis pellentesque
              lorem sit amet vestibulum. Morbi vel gravida nulla. Sed porttitor
              fermentum lorem vel blandit. Duis vulputate est quis ultricies
              imperdiet. Sed luctus mattis luctus. Vestibulum magna sapien,
              faucibus vel mauris nec, gravida posuere velit. Nulla non mi erat.
              Ut leo lacus, mattis in placerat sit amet, luctus vitae nisi.
              Integer neque urna, aliquam sit amet augue vel, pretium accumsan
              nisi. Integer vel nulla et quam luctus laoreet eget sit amet
              magna. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Suspendisse imperdiet varius nulla nec posuere.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
              <div>
                <h2 className="text-xl ">Atividades Programadas:</h2>
              </div>
              <div className="flex gap-1">
                <Badge variant="outline" className="p-2">
                  Atendimento Clínico
                </Badge>
                <Badge variant="outline" className="p-2">
                  Ambulatório
                </Badge>
                <Badge variant="outline" className="p-2">
                  Ambulatório
                </Badge>
              </div>
            </div>
            <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
              <div>
                <h2 className="text-xl ">Requisitos:</h2>
              </div>
              <div>
                <Badge variant="outline" className="p-2">
                  5º Semestre
                </Badge>
                <Badge variant="outline" className="p-2">
                  Inglês
                </Badge>
                <Badge variant="outline" className="p-2">
                  CNH válida
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button>Inscreva-se já!</Button>
          </div>
        </div>
      </div>
    </CentralizerContainer>
  );
}
