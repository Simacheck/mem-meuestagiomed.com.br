"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextInput } from "../../TextInput";
import { InputForm } from "../../InputForm";
import { InputSelectForm } from "../../InputSelectForm";
import { InputSimpleDate } from "../../InputDatePicker";
import { Estados, Semestres } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ActivityI,
  MedicI,
  ModalitysI,
  OpeningI,
  SpecialityI,
  StudentI,
  TypesI,
} from "@/utils/types/vagaI";
import { optionsSelects } from "@/utils/functions";
import { useEffect, useState } from "react";
import { api } from "@/utils/services";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSignin } from "@/hook/useSignin";
import { InputMaskForm } from "../../InputMaskForm";
import { InputMultiSelectForm } from "../../InputMultiSelectForm";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { InputDocForm } from "../../InputDocForm";
import { statesBR } from "@/utils/menuitens";
import { InputDateFormTwo } from "../../InputDateForm";

interface Props {
  initialValues?: MedicI | StudentI;
}

const formSchema = z.object({});

export const PerfilForm = ({ initialValues }: Props) => {
  const [modalities, setModalities] = useState<ModalitysI[]>();
  const [types, setTypes] = useState<TypesI[]>();
  const [specialities, setSpecialities] = useState<SpecialityI[]>();
  const [activities, setActivities] = useState<ActivityI[]>();
  const [novoEndereco, setNovoEndereco] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadPage, setLoadPage] = useState<boolean>(true)

  const router = useRouter();
  console.log('foiiiiii' , initialValues)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name
    }
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };


  async function getDados() {
    const dados = await api.get("/opening/defaults").then((e) => {
      setModalities(e.data.modality);
      setTypes(e.data.types);
      setSpecialities(e.data.speciality);
      setActivities(e.data.activitys);
    });

    return dados;
  }

  useEffect(() => {
    getDados();
  }, []);


  return (
    <Form {...form}>
      
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="p-2 flex flex-col justify-center w-full flax-wrap align-center">
            <div className="m-auto">
              <Avatar className="h-[15rem] w-[15rem] bg-red-500">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>

            <InputForm
              formControl={form.control}
              name={"name"}
              placeholder="Digite seu Nome"
              className="py-2"
            />
            <InputForm
              formControl={form.control}
              name={"email"}
              placeholder="Digite seu melhor e-mail"
              className="py-2"
            />
            <InputMaskForm
              formControl={form.control}
              className="py-2"
              name={"phone_number"}
              mask={"(__) _ ____-____"}
              placeholder="Digite seu número de telefone"
            />

            <div className=" py-2 flex gap-2 w-full">
              <InputDateFormTwo
                className="w-full max-w-[50%]"
                formControl={form.control}
                name={"birthdate"}
                placeholder="Data de Aniversario"
              />
              <InputMaskForm
                formControl={form.control}
                className="w-full max-w-[50%]"
                name={"tax_document"}
                mask={"___.___.___-__"}
                placeholder="Digite seu CPF"
              />
            </div>

            <div className=" py-2 flex gap-2 w-full">
              <InputForm
                formControl={form.control}
                name={"professional_certificate"}
                type="number"
                placeholder="Digite seu CRM"
                className="w-full max-w-[50%]"
              />
              <InputSelectForm
                formControl={form.control}
                placeholder="Estado do CRM"
                name={"federative_unit_professional_certificate"}
                className="w-full max-w-[50%]"
                itens={statesBR}
              />
            </div>

            <div className="py-2">
              <InputDocForm
                label={"Foto de Perfil"}
                formControl={form.control}
                name={"picture_url"}
                accept="image/*"
              />
            </div>

            <InputForm
              formControl={form.control}
              name={"password"}
              type="password"
              className="py-2"
              placeholder="Digite uma senha"
            />

            <InputForm
              formControl={form.control}
              name={"confirmPassword"}
              type="password"
              className="py-2"
              placeholder="Confirme sua senha"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {" "}
            Criar Estágio{" "}
            {loading && <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      
    </Form>
  );
};
