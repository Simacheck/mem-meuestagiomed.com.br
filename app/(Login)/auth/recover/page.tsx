'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecoverEmailForm } from "@/components/memComponents/Forms/Recover/EmailForm";
import { useState } from "react";
import { ConfirmationForm } from "@/components/memComponents/Forms/Recover/ConfirmationForm";

export default function RecoverPass() {
  const [etapa, setEtapa] = useState(0)
  const [email, setEmail] = useState('')

  function handleChangeEtapa (email: string) {
    setEtapa(1)
    setEmail(email)
  }
  
  return (
    <div className="h-screen flex align-center ">
      <div className="m-auto">
        <Card className="max-w-md w-[100%] min-w-[360px] m-auto">
          <CardHeader className="py-2 ">
            <CardTitle className="text-2xl">Recupere sua senha.</CardTitle>
          </CardHeader>
          {
            etapa == 0 ?  
            <RecoverEmailForm handleChangeEtapa={handleChangeEtapa} />
            :
            <ConfirmationForm email={email}/>
          }
        </Card>
      </div>
    </div>
  );
}
