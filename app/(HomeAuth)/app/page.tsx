'use client'

import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { SelectFilter } from "@/components/memComponents/SelectFilter";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { SingleDate } from "@/components/memComponents/InputSingleDate";
import { useEffect, useState } from "react";
import { api } from "@/utils/services";
import axios from "axios";
import { useSignin } from "@/hook/useSignin";
import { HomeMedico } from "@/components/pages/HomeMedico";

export default function Signin() {
  const { user } = useSignin()


  return (
    <>
    {
      user?.userType == 'medico' ?
      (<HomeMedico />) : (<CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <div className="py-2">
          <h2 className="text-3xl">
            Oportunidades:
          </h2>
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
          <EstagioCard />
          <EstagioCard />
          <EstagioCard />
          <EstagioCard />
        </div>
      </div>
    </CentralizerContainer>)
    }
    </>
  );
}
