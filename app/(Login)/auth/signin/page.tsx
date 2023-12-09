'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { LoginForm } from "@/components/memComponents/Forms/Login";

export default function Signin() {
  return (
    <div className="h-screen flex align-center ">
      <div className="m-auto">
        <Image
          src="/logo-simples-azul.png"
          height={200}
          width={240}
          alt="usp"
          className="m-auto pb-5"
        />
        <Card className="max-w-md w-full m-auto">
          <CardHeader className="py-6">
            <CardTitle className="text-2xl">Seja bem vindo.</CardTitle>
            <CardDescription>
              Entre com seu email e senha ou crie sua conta.
            </CardDescription>
          </CardHeader>
            <LoginForm />
        </Card>
      </div>
    </div>
  );
}
