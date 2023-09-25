import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecoverEmailForm } from "@/components/memComponents/Forms/Recover/EmailForm";

export default function RecoverPass() {
  return (
    <div className="h-screen flex align-center ">
      <div className="m-auto">
        <Card className="max-w-md w-full min-w-fit">
          <CardHeader className="py-6">
            <CardTitle className="text-2xl">Recupere sua senha.</CardTitle>
            <CardDescription>
             Preencha os dados abaixo:
            </CardDescription>
          </CardHeader>
          <RecoverEmailForm />
        </Card>
      </div>
    </div>
  );
}
