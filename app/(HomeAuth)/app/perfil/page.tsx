"use client";

import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { InputSelectForm } from "@/components/memComponents/InputSelectForm";
import { SingleDate } from "@/components/memComponents/InputSingleDate";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { toast } from "@/components/ui/use-toast";
import { differenceInDays, toDate } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useEffect, useState } from "react";
import { OportunidadeForm } from "@/components/memComponents/Forms/OportunidadeForm";
import { useSignin } from "@/hook/useSignin";
import { PerfilForm } from "@/components/memComponents/Forms/PerfilForm";
import { Loader2 } from "lucide-react";

export default function EditarPerfil() {
  const { user } = useSignin();
  const [loadPage, setLoadPage] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoadPage(false), 2000);
  }, [user]);

  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <h2 className="text-3xl">Editar Perfil:</h2>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          {loadPage ? (
            <div className="min-h-[40rem] flex items-center justify-center">
              <Loader2 className="mr-4 ml-6 h-16 w-16 animate-spin" />
            </div>
          ) : (
            <PerfilForm initialValues={user} />
          )}
        </div>
      </div>
    </CentralizerContainer>
  );
}
