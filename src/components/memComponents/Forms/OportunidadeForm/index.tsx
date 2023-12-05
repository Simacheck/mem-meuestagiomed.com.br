"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextInput } from "../../TextInput";
import { InputForm } from "../../InputForm";
import { InputSelectForm } from "../../InputSelectForm";
import { InputSimpleDate } from "../../InputDatePicker";
import { InputList } from "../../InputList";
import { Areas, Estados, Locais, Semestres } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VagaI } from "@/utils/types/vagaI";
import { validarOpcaoUnica } from "@/utils/functions";
import { toDate } from "date-fns";

interface Props {
  values?: VagaI
}

const formSchema = z
  .object({
    area: z.string(),
    type: z.string(),
    dataFinalInscricao: z.date(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
    semestreMin: z.string(),
    initialDate: z.date(),
    finishDate: z.date(),
    time: z.string(),
    atividades: z.string().array(),
    requisitos: z.string().array(),
    descricao: z.string(),
  })
  .refine((data) => data.finishDate > data.initialDate, {
    path: ["end"],
    message: "A data final não pode ser maior que a data inicial.",
  }).refine(data => data.dataFinalInscricao <= data.initialDate , {
    path: ["dataFinalInscricao"],
    message: "A data final de inscrição não pode ser maior que a data inicial.",
  });

export const OportunidadeForm = ({values}: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: values?.area && validarOpcaoUnica(values.area, Areas),
      type: values?.type && validarOpcaoUnica(values.type, Locais),
      dataFinalInscricao: values?.dataFinalInscricao && toDate(Date.parse(values.dataFinalInscricao)),
      finishDate: values?.finishDate && toDate(Date.parse(values.finishDate)),
      initialDate: values?.initialDate && toDate(Date.parse(values.initialDate)),
      bairro: values?.bairro,
      cidade: values?.cidade,
      estado: values?.estado && validarOpcaoUnica(values.estado, Estados),
      semestreMin: values?.semestreMin && validarOpcaoUnica(values.estado.toString(), Estados),
    }
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
            itens={Areas}
          />
        </div>
        <div className="px-4 flex items-center gap-2">
          <div>
            <p>Em qual tipo de local será realizado o acompanhamento?</p>
            <InputSelectForm
              formControl={form.control}
              placeholder="Selecione"
              name={`type`}
              className="max-w-[400px]"
              itens={Locais}
            />
          </div>
          <div>
          <p>Qual a data final para inscrição?</p>
          <InputSimpleDate
            formControl={form.control}
            name={"dataFinalInscricao"}
            />

          </div>
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
              itens={Estados}
            />
          </div>
        </div>

        <div className="px-4 flex flex gap-3">
          <InputSelectForm
            formControl={form.control}
            label="Semestre Mínimo"
            name={`semestreMin`}
            itens={Semestres}
          />
          <InputSimpleDate
            label="Data de Início"
            formControl={form.control}
            name={"initialDate"}
          />
          <InputSimpleDate
            label="Data de Final"
            formControl={form.control}
            name={"finishDate"}
          />
          <InputForm
            label="Quantidade de Horas "
            formControl={form.control}
            placeholder="Horas"
            name={`time`}
            type="number"
          />
        </div>

        <div className="px-4 flex flex gap-2">
          <InputList
            maxL={5}
            label="Atividades Programadas"
            formControl={form.control}
            name={"atividades"}
          />

          <InputList
            maxL={5}
            label="Requisitos Mínimos"
            formControl={form.control}
            name={"requisitos"}
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
