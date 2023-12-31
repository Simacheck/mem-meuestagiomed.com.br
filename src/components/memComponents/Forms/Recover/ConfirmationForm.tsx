"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Icons } from "../../Icons";
import { Loader2 } from "lucide-react";
import { api } from "@/utils/services";

const formSchema = z
  .object({
    code: z.string({
      required_error: "É necessário um comprovante de matrícula",
    }),
    new_password: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
    confirmPassword: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não combinam",
  });

interface ValuesI {
  code: string;
  new_password: string;
}

interface Props {
  email: string;
}

export function ConfirmationForm({ email }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: ValuesI) => {
    const dados = {
      email,
      code: values.code,
      new_password: values.new_password,
    };
    console.log(dados);
    setLoading(true);

    await api
      .post(`/password/confirmation`, dados)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Sua senha foi redefinida com sucesso, você será redirecionado",
          icon: "sucess",
        });

        return router.push("/auth/signin");
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description:
            "Algo deu errado, pode gentilmente tentar novamente mais tarde?",
          icon: "alert",
        });

        return; //setTimeout(() => router.push("/signin"), 5000);
      });
  };

  return (
    <CardContent className="grid py-1">
      <div>
        <div className="pb-4 text-center">
          <div>
            <p>
              Um código foi enviado para o e-mail informado, preencha-o abaixo.
              <br />
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex-col"
          >
            <InputForm
              formControl={form.control}
              type={"text"}
              className="mb-2"
              placeholder={"Código de Verificação"}
              name="code"
            />
            <InputForm
              formControl={form.control}
              name={"new_password"}
              type="password"
              className="py-2"
              placeholder="Digite uma senha"
            />
            <InputForm
              formControl={form.control}
              name={"confirmPassword"}
              type="password"
              className="py-2"
              placeholder="Confirma a senha"
            />
            <Button className="w-full " disabled={loading}>
              Próximo
              {loading && (
                <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </CardContent>
  );
}
