import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Footer } from "@/components/memComponents/footer";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/memComponents/Forms/Login.tsx";

export default function Home() {
  return (
    <div className="h-screen flex align-center">
      <div className="m-auto">
        <Image
          src="/loggo.png"
          height={200}
          width={260}
          alt="usp"
          className="m-auto pb-5"
        />
        <Card className="w-[450px] m-auto">
          <CardHeader className="py-6">
            <CardTitle className="text-2xl">Seja bem vindo.</CardTitle>
            <CardDescription>
              Entre com seu email e senha ou crie sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 py-2">
            <div>
              <LoginForm />
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
         
            <Button className="w-full">Criar Conta</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
