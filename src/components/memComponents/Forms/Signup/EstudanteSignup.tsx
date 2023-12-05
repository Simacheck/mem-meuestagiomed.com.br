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
import { parseISO, sub } from "date-fns";
import { api } from "@/utils/services";
import { FileRequestI } from "@/utils/types/vagaI";

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
    picture_url: z.object({ 
      type: z.string({ required_error: "É necessário uma foto de perfil"  }),
      content: z.string({ required_error: "É necessário uma foto de perfil"  }),
    }),
    enrollment_certificate_url: z.object({
      type: z.string({ required_error: "É necessário uma foto de perfil"  }),
      content: z.string({ required_error: "É necessário uma foto de perfil"  }),
    }),
    school_term: z.string({
      required_error: "É necessário selecionar uma Universidade",
    }),
    password: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
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
  picture_url: FileRequestI;
  enrollment_certificate_url: FileRequestI;
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: ValuesProps) => {
    const data = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number, 
      birthdate: values.birthdate.toDateString(),
      tax_document: values.tax_document,
      picture_url: values.picture_url,
      enrollment_certificate_url: values.enrollment_certificate_url,
      school_term: values.school_term,
      password: values.password,
      usage_terms: values.usage_terms,
    }
    
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
          description:
            "Algo deu errado, por gentileza, tente mais tarde.",
          icon: "alert",
        });

        return 
      });
  };

  return (
    <>
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
                    placeholder="Escolha sua faculdade "
                    formControl={form.control}
                    name={"school_term"}
                    className="w-full"
                    itens={[
                      {
                        label: "Usp",
                        value: "usp",
                      },
                      {
                        label: "Unesp",
                        value: "unesp",
                      },
                    ]}
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

                <div className="py-2">
                  <InputDocForm
                    label={"Comprovante de Matrícula"}
                    formControl={form.control}
                    name={"enrollment_certificate_url"}
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
                      <>
                        Estou ciente e concordo com os{" "}
                        <Link href={"/"} className="underline">
                          Termos de Uso
                        </Link>
                        .
                      </>
                    }
                  />
                </div>

                <Button className="w-full" type="submit">
                  Cadastrar
                </Button>
                <Button
                  variant={"outline"}
                  className="mt-2 w-full"
                  onClick={() => route.back()}
                >
                  Voltar
                </Button>
              </ScrollArea>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}
