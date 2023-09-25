"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import {
  Form,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  validation: z.string().optional(),
});

export function ConfirmationLogin() {
  const router = useRouter()
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [valor, setValor] = useState<number>(10);

  useEffect(() => {
    if (valor != 0) {
      setTimeout(() => setValor(valor - 1), 1000);
    }
  }, [valor]);

  const onSubmit = (values: any) => {
    console.log(values);

    toast({
      title: "Sucesso!",
      description:
        "Seu cadastro foi confirmado com sucesso, você será redirecionado ",
      icon: "sucess",
    });

    setTimeout(() => router.push('/signin'), 1000);
  };

  const handleNewRequest = () => {
    console.log("nova rota");

    toast({
      title: "Novo código enviado com sucesso!",
      description:
        "Seu código de confirmação foi enviado com sucesso, verifique sua caixa de entrada. ",
      icon: "sucess",
    });

    setValor(60)
  }

  return (
    <>
      <CardContent className="grid gap-2 py-2">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex-col"
            >
              <div className="py-4">
                <p className="text-md text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Um e-mail de verificação foi enviado ao seu e-mail de
                  cadastro, acesse-o e insira o código de validação abaixo:
                </p>
              </div>
              <InputForm
                formControl={form.control}
                className="mb-4"
                placeholder={"Código de Validação"}
                name="validation"
              />

              <Button className="w-full" type="submit">
                Validar
              </Button>
              <Button
                variant={"outline"}
                className="mt-2 w-full"
                disabled={valor != 0}
                onClick={() => handleNewRequest()}
              >
                Solicitar Novo Código {`${valor != 0 ? `${valor}` : ""}`}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}
