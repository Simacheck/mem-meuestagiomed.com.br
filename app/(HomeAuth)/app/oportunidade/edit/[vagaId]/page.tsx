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
import { usePathname } from "next/navigation";
import { useSignin } from "@/hook/useSignin";
import { VagaI } from "@/utils/types/vagaI";
import { api } from "@/utils/services";

interface Props {
  params: {
    vagaId: string
  }
}
export default function EditEstagio({params}:Props) {
  const {vagaId} = params
  const { user } = useSignin();
  const [load, setLoading] = useState(true);
  const [vaga, setVaga] = useState<VagaI>();

  async function getDados(data: string) {
    await api.get(`/vagas/${data}`).then((r) => {
      setVaga(r.data);
    })

    return;
  }

  useEffect(() => {
    setLoading(true);
    getDados(vagaId);
    setTimeout(() => setLoading(false), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vagaId]);



  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <h2 className="text-3xl">Editar Estágio {`#${vagaId}`}</h2>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          {
            !load && 
          <OportunidadeForm values={vaga} />
          }
        </div>
      </div>
    </CentralizerContainer>
  );
}
