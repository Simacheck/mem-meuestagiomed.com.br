"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { InputMaskForm } from "../../InputMaskForm";
import { InputDateForm } from "../../InputDateForm";
import { InputSelectForm } from "../../InputSelectForm";
import { statesBR } from "@/utils/states";
import { useToast } from "@/components/ui/use-toast";
import { InputCheckboxForm } from "../../InputCheckBoxForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = () => reject(new Error("error on tranform to base64"));
  });
};

const formSchema = z
  .object({
    name: z.string({ required_error: "Nome é necessário" }),
    email: z
      .string({ required_error: "Email é necessário" })
      .email({ message: "E-mail inválido" }),
    tel: z.string({ required_error: "É necessário um número" }),
    cpf: z.string({ required_error: "É necessário um CPF" }),
    birthday: z.date({
      required_error: "É necessário uma data válida",
    }),
    crm: z.string({ required_error: "É necessário um CRM" }),
    ufCrm: z.string({ required_error: "É necessário um Estado" }),
    password: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
    picture: z.instanceof(File),
    confirmPassword: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
    terms: z.literal(true, {
      invalid_type_error: "É necessário aceitar os termos de uso",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não combinam",
  });

interface Props {
  userType: number;
}

export function MedicoSignup({ userType }: Props) {
  const { toast } = useToast();
  const [base64, setBase64] = useState<string | null>(null);
  const [base64error, setBase64Error] = useState<boolean>(false)
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    //resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleChangeInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const files = target.files;

    if (!files) return;

    const file = files[0];

    try {
      const base64File = await convertToBase64(file);
      setBase64(base64File);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (values: any) => {
    if (base64 === null){
      setBase64Error(true)

      return
    } else (
      setBase64Error(false)
    )

    const newValues = {...values, picture: base64}

    toast({
      title: "Sucesso!",
      description:
        "Seu cadastro foi recebido, iremos enviar um e-mail para confirmação",
      icon: "sucess",
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
                <Link
                  href={"/signup"}
                  className="underline text-primary text-sm"
                >
                  {" "}
                  Voltar{" "}
                </Link>
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
                  name={"tel"}
                  mask={"(__) _ ____-____"}
                  placeholder="Digite seu número de telefone"
                />

                <div className=" py-2 flex gap-2 w-full">
                  <InputDateForm
                    className="w-full max-w-[50%]"
                    formControl={form.control}
                    name={"birthday"}
                    placeholder="Data de Aniversario"
                  />
                  <InputMaskForm
                    formControl={form.control}
                    className="w-full max-w-[50%]"
                    name={"cpf"}
                    mask={"___.___.___-__"}
                    placeholder="Digite seu CPF"
                  />
                </div>
                <div className=" py-2 flex gap-2 w-full">
                  <InputForm
                    formControl={form.control}
                    name={"crm"}
                    type="number"
                    placeholder="Digite seu CRM"
                    className="w-full max-w-[50%]"
                  />
                  <InputSelectForm
                    formControl={form.control}
                    name={"ufCrm"}
                    className="w-full max-w-[50%]"
                    itens={statesBR}
                  />
                </div>

                {/*<InputForm
                  label="Escolha uma foto de perfil"
                  formControl={form.control}
                  name={"picture"}
                  type="file"
                  className="py-2"
  />*/}
                <div>
                  <Input
                    name={"picture"}
                    type="file"
                    accept="image/*"
                    onChange={handleChangeInput}
                  />
                  {base64error && (
                    <p
                      id={"picture"}
                      className="text-sm font-medium text-red-500 mx-0"
                    >
                      É necessário ter uma foto
                    </p>
                  )}
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
                    name={"terms"}
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
