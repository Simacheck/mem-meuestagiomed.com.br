import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import NewSteps from "../../../../src/components/memComponents/Forms/Signup/NewSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Entrar | Meuestagiomed",
  icons: '../favicon.ico'
}; 

export default function Signin() {
  return (
    <div className="h-screen flex align-center">
      <div className="m-auto max-w-md w-full">
        <Card className="max-w-md w-full m-auto">
          <CardHeader>
            <CardTitle className="text-2xl ">Cadastre-se:</CardTitle>
          </CardHeader>
          <NewSteps />
        </Card>
      </div>
    </div>
  );
}
