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
import { Loader2 } from "lucide-react";
import { api } from "@/utils/services";

const formSchema = z.object({
  email: z.string().email({
    message: "É necessário um e-mail válido.",
  }),
});

interface ValuesI {
  email: string;
}

interface Props {
  handleChangeEtapa: (email: string) => void;
}

export function RecoverEmailForm({ handleChangeEtapa }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: ValuesI) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => handleChangeEtapa(values.email), 2000);
    /*await api
      .post(`/password/forgot/`, values)
      .then((e) => {
       
        return handleChangeEtapa(values.email);
      })
      .catch((e) => {

        return;
      });
*/
    // setTimeout(() => router.push("/signin"), 5000);
  };

  return (
    <CardContent className="grid py-1">
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
    </CardContent>
  );
}
