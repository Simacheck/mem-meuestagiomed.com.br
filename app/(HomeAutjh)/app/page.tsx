import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/memComponents/Forms/Login";
import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { FilterCard } from "@/components/memComponents/FilterCard";
import { SelectFilter } from "@/components/memComponents/SelectFilter";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { EstagioCard } from "@/components/memComponents/EstagioCard";

export default function Signin() {
  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <div className=" rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col md:flex-row flex-wrap items-center justify-around md:justify-start gap-4 w-full p-2 my-2">
          <p>Filtros:</p>
          <div className="py-2 sm:py-0">
            <SelectFilter
              itens={[
                { value: "ord", label: "Dermatologia" },
                { value: "rd", label: "Psiquiatria" },
              ]}
              placeholder={"Especialidade"}
              width={"300"}
            />
          </div>

          <div className="py-2 sm:py-0">
            <RangeDatePicker />
          </div>

          <div className="py-2 sm:py-0">
            <SelectFilter
              itens={[
                { value: "1s", label: "1º Semestre" },
                { value: "2s", label: "2º Semestre" },
              ]}
              placeholder={"Semestre Mínimo"}
              width={"300"}
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-2">
          <EstagioCard />
          <EstagioCard />
          <EstagioCard />
          <EstagioCard />

        </div>
      </div>
    </CentralizerContainer>
  );
}
