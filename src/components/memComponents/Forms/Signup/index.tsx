"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  birthday: z.date({
    required_error: "É necessário uma data válida",
  }),
  cpf: z.string().min(14, {message: 'É necessário um CPF válido'}),
  crm: z.string().min(1, {message: 'É necessário'}),
  ufCrm: z.string(),
  description: z.string().max(256),
  picture: z.string(),
  specialty: z.string(),
  tel: z.string(),
  email: z.string().email({
    message: "É necessário um e-mail válido.",
  }),
  password: z.string(),
});

export function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };
  console.log(form.formState.errors)
  return (
    <>
      <CardContent className="grid gap-2 py-2">
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
                placeholder={"Email"}
                name="email"
              />
              <InputForm
                formControl={form.control}
                type={"password"}
                className="mb-4"
                placeholder={"Senha"}
                name="password"
              />

              <Button className="w-full ">Entrar</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}
