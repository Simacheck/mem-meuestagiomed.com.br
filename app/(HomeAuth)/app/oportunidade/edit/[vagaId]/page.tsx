"use client";

import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";

import { useEffect, useState } from "react";
import { OportunidadeForm } from "@/components/memComponents/Forms/OportunidadeForm";
import { OpeningI } from "@/utils/types/vagaI";
import { api } from "@/utils/services";
import { Loader2 } from "lucide-react";

interface Props {
  params: {
    vagaId: string;
  };
}
export default function EditEstagio({ params }: Props) {
  const { vagaId } = params;
  const [load, setLoading] = useState(true);
  const [vaga, setVaga] = useState<OpeningI>();

  async function getDados(data: string) {
    await api.get(`/opening/${data}`).then((r) => {
      setVaga(r.data);
    });

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
          {load ? (
            <div className="min-h-[40rem] flex items-center justify-center">
              <Loader2 className="mr-4 ml-6 h-16 w-16 animate-spin" />
            </div>
          ) : (
            <OportunidadeForm initialValues={vaga} />
          )}
        </div>
      </div>
    </CentralizerContainer>
  );
}
