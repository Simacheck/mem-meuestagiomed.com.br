"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InputMultiSelectForm } from "../../InputMultiSelectForm"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InputDocForm } from "../../InputDocForm";

export const CurriculoForm = () => {
    const form = useForm({
      //resolver: zodResolver(formSchema),
    });

    const control = form.control

    const { fields, append, prepend, remove, swap, move, insert } =
      useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
        rules: { minLength: 1 },
      });

    const onSubmit = (values: any) => {
      console.log(values);
    };


    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="px-4 flex flex-col gap-2">
            <TextInput
              label="Descreva um pouco sobre você:"
              formControl={form.control}
              name={`descricao`}
              placeholder={
                "Fale um pouco sobre voce: Conte-nos sobre experiencias que você ja teve como participação em congressos, cursos, atividades extracurriculares, etc"
              }
            />
          </div>
          <Separator className="m-auto mb-0 " />
          <div className="px-4 flex flex-wrap gap-2">
            <InputMultiSelectForm
              formControl={form.control}
              label="Escolha a(s) especilidade(s) do seu interesse:"
              name={"teste"}
              className="w-[25rem]"
              placeholder="Especialidade"
              itens={[
                { value: "ord", label: "Dermatologia" },
                { value: "rd", label: "Psiquiatria" },
                {
                  value: "rdd",
                  label: "dasdfa",
                },
                {
                  value: "rdffd",
                  label: "adsfasdf",
                },
              ]}
            />
            <InputDocForm
              className="w-full md:w-[40%] "
              label="Anexe seu melhor currículo em pdf:"
              formControl={form.control}
              name={"arquivo"}
            />
          </div>
          {/*<Separator className="m-auto mb-0" />

          <div className="px-4 flex flex-col gap-2">
            <Label>Experiência Relevante: ({fields.length}/3)</Label>
            {fields.map((item, index) => (
              <Card
                className={"w-full flex flex-col justify-between"}
                key={item.id}
              >
                <CardHeader>
                  <CardTitle>Estágio 0{index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap w-full gap-4 mb-2">
                    <InputForm
                      label="Qual instituição ou clínica você estagiou?"
                      formControl={form.control}
                      name={`test.${index}.name`}
                      placeholder={"Instituição/Clínica"}
                      className="h-[100%] max-w-[20rem]"
                    />
                    <InputForm
                      label="Quem foi o médico responsável?"
                      formControl={form.control}
                      name={`test.${index}.medico`}
                      placeholder={"Instituição/Clínica"}
                      className="h-[100%] max-w-[20rem]"
                    />
                    <InputMaskForm
                      formControl={form.control}
                      name={`test.${index}.semestre`}
                      mask={"__/____"}
                      placeholder="Semestre/Ano"
                      label="Em qual semestre e ano o estágio foi realizado?"
                    />
                    <InputForm
                      label="Quem foi a carga horária do estágio?"
                      formControl={form.control}
                      name={`test.${index}.medico`}
                      placeholder={"Instituição/Clínica"}
                      className="h-[100%] max-w-[20rem]"
                    />
                  </div>
                  <div className=" w-full mb-2">
                    <TextInput
                      label="Descreva sua Experiência"
                      formControl={form.control}
                      name={`test.${index}.descricao`}
                      placeholder={"Experiencia"}
                    />
                  </div>

                  <Button variant={"outline"} onClick={() => remove(index)}>
                    Remover Estágio
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              disabled={fields.length > 2}
              className="w-[10rem]"
              onClick={() => append({ firstName: "", lastName: "" })}
            >
              Adicionar Estágio
            </Button>
          </div>
            <Separator className="m-auto mb-0" />*/}
          <Button type="submit"> Salvar Currículo</Button>
        </form>
      </Form>
    );
}