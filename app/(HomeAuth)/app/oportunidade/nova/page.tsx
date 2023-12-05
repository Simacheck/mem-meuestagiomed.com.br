"use client";

import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { InputSelectForm } from "@/components/memComponents/InputSelectForm";
import { SingleDate } from "@/components/memComponents/InputSingleDate";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { toast } from "@/components/ui/use-toast";
import { differenceInDays, toDate } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { OportunidadeForm } from "@/components/memComponents/Forms/OportunidadeForm";

export default function novoEstagio() {


  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <h2 className="text-3xl">Criar Estágio:</h2>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          
          <OportunidadeForm />
        </div>
      </div>
    </CentralizerContainer>
  );
}
