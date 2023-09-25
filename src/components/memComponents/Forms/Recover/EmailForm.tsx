"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "É necessário um e-mail válido.",
  }),
});

export function RecoverEmailForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);

    toast({
      title: "Um e-mail foi enviado!",
      description:
        "Um e-mail com as instruções foi enviado, verifique sua caixa de e-mail.",
      icon: "sucess",
    });

    setTimeout(() => router.push('/signin'),1000)
  };

  return (
    <>
      <CardContent className="grid py-1">
        <div>
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
              <Button className="w-full ">Próximo</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}
