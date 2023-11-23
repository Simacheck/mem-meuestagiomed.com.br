"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InputMultiSelectForm } from "../../InputMultiSelectForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextInput } from "../../TextInput";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { InputMaskForm } from "../../InputMaskForm";
import { InputForm } from "../../InputForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InputDocForm } from "../../InputDocForm";
import { InputSelectForm } from "../../InputSelectForm";
import { InputDateFormTwo } from "../../InputDateForm";
import { RangeDatePicker } from "../../RangeDatePicker";
import { InputSimpleDate } from "../../InputDatePicker";
import { InputList } from "../../InputList";
import { Semestres } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  area: z.string(),
  
});

export const OportunidadeForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="px-4 flex flex-col gap-2">
          <p>Em qual área médica a oportunidade será voltada?</p>
          <InputSelectForm
            formControl={form.control}
            placeholder="Selecione a área"
            name={`area`}
            className="max-w-[400px]"
            itens={[
              { label: "Ortopedia", value: "123" },
              { label: "Pscqud", value: "1123" },
            ]}
          />
        </div>
        <div className="px-4 flex flex-col gap-2">
          <p>Em qual bairro, cidade e estado será realizado?</p>
          <div className="flex gap-2">
            <InputForm
              formControl={form.control}
              placeholder="Bairro"
              name={`bairro`}
            />
            <InputForm
              formControl={form.control}
              placeholder="Cidade"
              name={`cidade`}
            />
            <InputSelectForm
              formControl={form.control}
              placeholder="Estado"
              name={`estado`}
              itens={[
                { label: "SP", value: "SP" },
                { label: "PR", value: "PR" },
              ]}
            />
          </div>
        </div>

        <div className="px-4 flex flex gap-3">
          <InputSelectForm
            formControl={form.control}
            label="Semestre Mínimo"
            name={`semestre`}
            itens={Semestres}
          />
          <InputSimpleDate
            label="Data de Início"
            formControl={form.control}
            name={"start"}
          />
          <InputSimpleDate
            label="Data de Final"
            formControl={form.control}
            name={"end"}
          />
          <InputForm
            label="Quantidade de Horas "
            formControl={form.control}
            placeholder="Horas"
            name={`horas`}
            type="number"
          />
        </div>

        <div className="px-4 flex flex gap-2">
          <InputList
            maxL={5}
            label="Atividades Programadas"
            formControl={form.control}
            name={"atividadesProgramadas"}
          />

          <InputList
            maxL={5}
            label="Requisitos Mínimos"
            formControl={form.control}
            name={"Requisitos Mínimos"}
          />
        </div>
        <div className="px-4 flex w-full flex gap-2">
          <TextInput
                label="Descreva um pouco sobre a oportunidade:"
                formControl={form.control}

                name={`descricao`}
                placeholder={
                  "Fale um pouco a oportunidade, qual será a rotina, quais as expectativas para o candidato e quais as suas expectativas da experiência prévia do candidato"
                }
                />
          </div>
        <Button type="submit"> Criar Estágio</Button>
      </form>
    </Form>
  );
};
