"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { InputMaskForm } from "../../InputMaskForm";
import { InputSelectForm } from "../../InputSelectForm";
import { useToast } from "@/components/ui/use-toast";
import { InputCheckboxForm } from "../../InputCheckBoxForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InputDateFormTwo } from "../../InputDateForm";
import "../../../react-datepicker.css";
import { InputDocForm } from "../../InputDocForm";
import { formatISO, parseISO, sub } from "date-fns";
import { api } from "@/utils/services";
import { FileRequestI } from "@/utils/types/vagaI";
import { Semestres } from "@/utils/options";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const REG_Mai = /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;


const formSchema = z
  .object({
    name: z.string({ required_error: "Nome é necessário" }),
    email: z
      .string({ required_error: "Email é necessário" })
      .email({ message: "E-mail inválido" }),
    phone_number: z.string({ required_error: "É necessário um número" }),
    birthdate: z
      .date({
        required_error: "É necessário uma data válida",
      })
      .max(sub(new Date(), { years: 18 }), {
        message: "É necessário ser maior de 18 anos",
      }),
    tax_document: z.string({ required_error: "É necessário um CPF" }),
    picture: z.object(
      {
        type: z.string({ required_error: "É necessário uma foto de perfil" }),
        content: z.string({
          required_error: "É necessário uma foto de perfil",
        }),
      },
      { required_error: "É necessário uma foto de perfil" }
    ),
    enrollment_certificate: z.object(
      {
        type: z.string({
          required_error: "É necessário um comprovante de matrícula",
        }),
        content: z.string({
          required_error: "É necessário um comprovante de matrícula",
        }),
      },
      { required_error: "É necessário um comprovante de matrícula" }
    ),
    school_term: z.string({
      required_error: "É necessário selecionar uma Universidade",
    }),
    password: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" })
      .regex(new RegExp(REG_Mai), {
        message: "A senha deve conter pelo menos um caractere maiúsculo",
      }),
    confirmPassword: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
    usage_terms: z.literal(true, {
      invalid_type_error: "É necessário confirmar os termos de uso",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não combinam",
  });

interface ValuesProps {
  name: string;
  email: string;
  phone_number: string;
  birthdate: Date;
  tax_document: string;
  picture: FileRequestI;
  enrollment_certificate: FileRequestI;
  school_term: string;
  password: string;
  usage_terms: boolean;
}

interface Props {
  handleUseSelectedTab: (number: number) => void;
}

export function EstudanteSignup({ handleUseSelectedTab }: Props) {
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: ValuesProps) => {
    const data = {
      email: values.email,
      password: values.password,
      details: {
        name: values.name,
        phone_number: values.phone_number,
        birthdate: formatISO(values.birthdate),
        tax_document: values.tax_document,
        //picture: values.picture,
        //enrollment_certificate: values.enrollment_certificate,
        school_term: values.school_term,
        usage_terms: values.usage_terms,
      },
    };

    setLoad(true)

    await api
      .post(`/auth/signup/student`, data)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Seu cadastro foi recebido, iremos enviar um e-mail para confirmação.",
          icon: "sucess",
        });

        return setTimeout(() => handleUseSelectedTab(2), 1000);
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, por gentileza, tente mais tarde.",
          icon: "alert",
        });
        setLoad(false)
        return;
      });
  };

  return (
    <div>
      <CardContent className="grid gap-2 py-2">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex-col"
              encType="multipart/form-data"
            >
              <ScrollArea className="h-[350px] overflow-auto">
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
                  <InputSelectForm
                    placeholder="Em qual período da faculdade está? "
                    formControl={form.control}
                    name={"school_term"}
                    className="w-full"
                    itens={Semestres}
                  />
                </div>

                <div className="py-2">
                  <InputDocForm
                    label={"Foto de Perfil"}
                    formControl={form.control}
                    name={"picture"}
                    accept="image/*"
                  />
                </div>

                <div className="py-2">
                  <InputDocForm
                    label={"Comprovante de Matrícula"}
                    formControl={form.control}
                    name={"enrollment_certificate"}
                    accept="image/*, application/pdf"
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

                <div className="py-4 pt-2">
                  <InputCheckboxForm
                    formControl={form.control}
                    name={"usage_terms"}
                    className="flex py-2 items-center gap-2"
                    label={
                      <div>
                        Estou ciente e concordo com os{" "}
                        <Link href={"/"} className="underline">
                          Termos de Uso
                        </Link>
                        .
                      </div>
                    }
                  />
                </div>

                <Button className="w-full" disabled={load} type="submit">
                  {load ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Cadastrar'}
                </Button>
                <Button
                  variant={"outline"}
                  className="mt-2 w-full"
                  onClick={() => route.replace('/auth/signin')}
                >
                  Voltar
                </Button>
              </ScrollArea>
            </form>
          </Form>
        </div>
      </CardContent>
    </div>
  );
}
