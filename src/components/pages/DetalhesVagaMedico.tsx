import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FileDown } from "lucide-react";
import { ModalDetalhesEstudante } from "../memComponents/ModalDetalhesEstudante";
import {  OpeningI } from "@/utils/types/vagaI";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface props {
  details?: OpeningI;
}

export const DetalhesMedico = ({ details }: props) => {
  const route = useRouter();
  const [send, setSend] = useState(false);

  const selecionado = details?.applications?.find(aplic => aplic.status == 'selected')
  console.log( details?.applications)
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Inscrições:</h2>
        {details?.status != "canceled" &&
          (details?.status == "finished" ? (
            <div> </div>
          ) : (
            <div className="flex gap-2">
              <Button variant={"outline"} onClick={() => route.refresh()}>
                {details?.status == "active"
                  ? "Fechar Inscrições"
                  : "Abrir Inscrições"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-600/90">Cancelar Oportunidade</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Cancelar Oportunidade</DialogTitle>
                    <DialogDescription>
                      Você tem certeza que deseja cancelar esta oportunidade?
                    </DialogDescription>
                  </DialogHeader>
                  
                  <DialogFooter>
                    <Button type="submit">Confirmar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
      </div>

      {details?.status == 'finished' && selecionado && (
        <div className="py-4">
          <div>
            <h2 className="text-md">Selecionado:</h2>
          </div>
          <div className="rounded-lg border max-w-[450px] p-2 flex flex-col items-center">
            <div>
              <h2 className="text-md">Você selecionou:</h2>
            </div>
            <div className="py-2">
              <Avatar className="h-[4rem] w-[4rem]">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <div className="test text-sm max-w-[80%] text-center">
              <p className="py-2">
                {selecionado.student.name}, para esta experiência.
              </p>
              <p className="py-2">
                Para maiores informações, verifique as informações pessoais do
                estudante abaixo:
              </p>
              <ModalDetalhesEstudante
                idVaga={details.id}
                aplication={selecionado}
                oportunidadeAberta={details.status != 'finished'}
                sendState={send}
                setSendState={setSend}
              />
              <p className="py-2">
                Nos detalhes acima, você terá acesso aos dados para entrar em
                contato diretamente com o estagiário, e, caso precise, estamos a
                disposição no canal de atendimento.
              </p>
            </div>
          </div>
        </div>
      )}
      { (details?.applications && details?.applications?.length > 0) ? (
        <div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-sm">
                Qtde Total de Inscritos: {details.applications.length}
              </h3>
            </div>
          </div>
          <div className="py-4">
            <div>
              <h2 className="text-md">Listagem de Inscritos:</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ordem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Faculdade</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Currículo</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details?.applications.map((aplicacao, idx) => (
                  <TableRow key={idx} >
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className=" ">
                      {aplicacao.student.name}{" "} 
                      {details.status == 'finished' && aplicacao.status == "selected" && (
                        <Badge>Selecionado</Badge>
                      ) }
                    </TableCell>
                    <TableCell>{aplicacao.student.university?.name}</TableCell>
                    <TableCell>{aplicacao.student.school_term}º Periodo</TableCell>
                    <TableCell>
                      <Button variant={"outline"}>
                        <FileDown />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ModalDetalhesEstudante
                        idVaga={details.id}
                        aplication={aplicacao}
                        oportunidadeAberta={
                          details.status == 'active'
                        }
                        sendState={send}
                        setSendState={setSend}
                      />
                    </TableCell>
                  </TableRow>
                      ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="w-full h-[10rem] flex justify-center items-center">
          <h3>
            Ainda não há inscritos.
          </h3>
        </div>
      )}
    </div>
  );
};
