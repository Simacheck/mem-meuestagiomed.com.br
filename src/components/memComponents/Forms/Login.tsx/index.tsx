"use client";

import { Button } from "@/components/ui/button";
import {
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputForm } from "../../InputForm";
import {
  Form,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "É necessário um e-mail válido.",
  }),
  password: z.string(),
});


export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: any) => {
      console.log(values);
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-col">
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
  );
}
