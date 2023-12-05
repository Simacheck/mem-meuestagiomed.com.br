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
import { InfoMedicoI } from "@/utils/types/vagaI";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  details?: InfoMedicoI;
  idVaga?: string;
  statusInscricoes?: string;
}

export const DetalhesMedico = ({
  details,
  idVaga,
  statusInscricoes,
}: props) => {
  const route = useRouter();
  const statusGeral = details?.inscritos.filter((est) => est.status);
  const [send, setSend] = useState(false);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Inscrições:</h2>
        {details?.situacao != "finalizado" && (
          <Button variant={"outline"} onClick={() => route.refresh()}>
            {statusInscricoes == "aberto"
              ? "Fechar Inscrições"
              : "Abrir Inscrições"}
          </Button>
        )}
      </div>

      {details?.selecionado && (
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
                {details.selecionado.nome}, para esta experiência.
              </p>
              <p className="py-2">
                Para maiores informações, verifique as informações pessoais do
                estudante abaixo:
              </p>
              <ModalDetalhesEstudante
                idVaga={idVaga}
                estudante={details.selecionado}
                oportunidadeAberta={statusGeral && statusGeral?.length > 0}
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
      {details?.situacao !== "aberto" ? (
        <>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-sm">
                Qtde Total de Inscritos: {details?.inscritos?.length}
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
                {details?.inscritos.map((estudante, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {estudante.nome}{" "}
                      {statusGeral && estudante.status == "selecionado" ? (
                        <Badge>Selecionado</Badge>
                      ) : (
                        <Badge variant={"outline"}>Não Selecionado</Badge>
                      )}
                    </TableCell>
                    <TableCell>{estudante.faculdade}</TableCell>
                    <TableCell>{estudante.periodo}º Periodo</TableCell>
                    <TableCell>
                      <Button variant={"outline"}>
                        <FileDown />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ModalDetalhesEstudante
                        idVaga={idVaga}
                        estudante={estudante}
                        oportunidadeAberta={
                          statusGeral && statusGeral?.length > 0
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
        </>
      ) : (
        <div className="w-full h-[10rem] flex justify-center items-center">
          <h3>
            As inscrições irão começar após a confirmação do estágio pela equipe
            MEM.
          </h3>
        </div>
      )}
    </div>
  );
};
