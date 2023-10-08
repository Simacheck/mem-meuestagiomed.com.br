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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string({ required_error: "É necessário um e-mail" }).email({
    message: "É necessário um e-mail válido.",
  }),
  password: z.string({ required_error: "É necessário uma senha." }),
});

interface ValuesI {
  email: string;
  password: string;
}


export function LoginForm() {
  const router = useRouter()
    const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: ValuesI) => {

    if(values.email === 'mem@mem.com.br' && values.password === 'senha12') {
      router.push('/app')
      return
    } 
    toast({
      title: "Email ou senha incorretos!",
      description: `${JSON.stringify(values)}`,
      icon: "alert",
    });
    return;

    
  };

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
              <div className="mb-4">
                <InputForm
                  formControl={form.control}
                  type={"password"}
                  placeholder={"Senha"}
                  name="password"
                />
                <div className="w-full text-right">
                  <Link className="text-xs underline" href={"/recover"}>
                    {" "}
                    Esqueci minha senha
                  </Link>
                </div>
              </div>

              <Button className="w-full ">Entrar</Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 py-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou registre-se já
            </span>
          </div>
        </div>

        <Button className="w-full" onClick={() => router.push("/signup")}>
          Criar Conta
        </Button>
      </CardFooter>
    </>
  );
}
