import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecoverEmailForm } from "@/components/memComponents/Forms/Recover/EmailForm";

export default function RecoverPass() {
  return (
    <div className="h-screen flex align-center ">
      <div className="m-auto">
        <Card className="max-w-md w-[100%] min-w-[360px] m-auto">
          <CardHeader className="py-2 ">
            <CardTitle className="text-2xl">Recupere sua senha.</CardTitle>
          </CardHeader>
          <RecoverEmailForm />
        </Card>
      </div>
    </div>
  );
}
