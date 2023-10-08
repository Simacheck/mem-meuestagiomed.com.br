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

const formSchema = z.object({
  email: z.string().email({
    message: "É necessário um e-mail válido.",
  }),
});

interface ValuesI {
  email: string
}

export function RecoverEmailForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [text, setText ] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (values: ValuesI) => {
    console.log(values);
    setLoading(true);
    setText(values.email);
    toast({
      title: "Um e-mail foi enviado!",
      description:
        "Um e-mail com as instruções foi enviado, verifique sua caixa de e-mail.",
      icon: "sucess",
    });

    setTimeout(() => router.push("/signin"), 5000);
  };
  console.log(loading)

  return (
    <>
      <CardContent className="grid py-1">
        {!loading ? (
          <div>
            <CardDescription>Preencha os dados abaixo:</CardDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex-col"
              >
                <InputForm
                  formControl={form.control}
                  type={"email"}
                  className="mb-4"
                  placeholder={"Email de Cadastro"}
                  name="email"
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
        ) : (
          <div className="pb-4 text-center">
            <p>
              <span className="font-bold">Excelente!</span>
              <br />
              Um e-mail foi enviado para <span className="font-bold">{text}</span>, verifique os
              próximos passos por lá.
              <br />
              <div className="py-2">
                <span className="">Você será redirecionado em 5 segundos.</span>
              </div>
            </p>
          </div>
        )}
      </CardContent>
    </>
  );
}
