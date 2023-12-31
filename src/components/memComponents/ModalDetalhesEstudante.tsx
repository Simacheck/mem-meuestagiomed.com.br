import { FileDown, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ApplicationsI, StudentI } from "@/utils/types/vagaI";
import { Avatar, AvatarImage } from "../ui/avatar";
import { api } from "@/utils/services";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  aplication: ApplicationsI;
  idVaga?: string;
  oportunidadeAberta?: boolean;
  sendState: boolean;
  setSendState: Dispatch<SetStateAction<boolean>>
}

export const ModalDetalhesEstudante = ({ aplication, idVaga, oportunidadeAberta, sendState, setSendState }: Props) => {
  const estudante = aplication.student

  const handleConfirmation = async () => {
    setSendState(true)
    const dados = {vagaId: idVaga, estudante: estudante.id}
    await api.post(`/vagas/${idVaga}/confirmar`, dados)

    setTimeout(() => setSendState(false), 5000)
  }

  return (
    <div className="flex gap-2 justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Mais Detalhes</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Estagiario</DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="flex gap-2 py-2 flex-col items-center">
              <Avatar className="h-[6rem] w-[6rem]">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="text-xl">{estudante.name}</div>
              {aplication.status == 'selected' &&  <Badge>Selecionado</Badge>}
            </div>
            <div className="flex flex-col w-full justify-between">
              {aplication.status == 'selected' ? (
                <div className="flex w-full gap-10 justify-between py-2">
                <div className="py-2 max-w-[45%]">
                  <div>
                    <div>
                      <p>Celular:</p>
                    </div>
                    <h3 className="text-md">{estudante.phone_number}</h3>
                  </div>
                </div>
                <div className="py-2 max-w-[45%]">
                  <div>
                    <div className="w-full">
                      <p className="break-words">Email:</p>
                    </div>
                    <h3 className="text-md break-words">{estudante.email}</h3>
                  </div>
                </div>
              </div>
              ) : null}
              <div className="flex w-full gap-10 justify-between py-2">
                <div className="py-2 max-w-[30%]">
                  <div>
                    <div>
                      <p>Faculdade:</p>
                    </div>
                    <h3 className="text-md">{estudante.university?.name}</h3>
                  </div>
                </div>

                <div className="py-2">
                  <div>
                    <div>
                      <p>Período:</p>
                    </div>
                    <h3 className="text-md">{estudante.school_term}º</h3>
                  </div>
                </div>
                <div className="py-2 max-w-[30%]">
                  <div>
                    <div>
                      <p>Campus:</p>
                    </div>
                    <h3 className="text-md">{estudante.university?.address?.city}</h3>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-10 justify-between py-2">
                <div>
                  <div>
                    <p>Áreas de Interesse:</p>
                  </div>
                  <div className="flex gap-2">
                    {estudante.specialities && estudante.specialities.map((x) => (
                      <Badge key={x.id}>{x.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-10 items-center py-2">
                <div>
                  <p>Currículo:</p>
                </div>
                <Button
                  variant={"outline"}
                  onClick={() => console.log("aqui")}
                >
                  <FileDown />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {oportunidadeAberta && <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" disabled={sendState} >{sendState ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Selecionar'}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirma a seleção de {estudante.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Após a confirmação, não será permitido a alteração do estagiário,
              tens certeza que eseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmation}
              disabled={sendState} 
            >
              {sendState ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Continuar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>}
    </div>
  );
};
