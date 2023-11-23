import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import NetSteps from "./NewSteps";


export default function Signin() {
  return (
    <div className="h-screen flex align-center">
      <div className="m-auto max-w-md w-full">
        <Card className="max-w-md w-full m-auto">
          <CardHeader>
            <CardTitle className="text-2xl ">Cadastre-se:</CardTitle>
          </CardHeader>

          <NetSteps />
        </Card>
      </div>
    </div>
  );
}
