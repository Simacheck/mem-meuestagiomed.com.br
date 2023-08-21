import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-primary h-[50vh] min-h-[400px] bg-[url('/consult.jpeg')] bg-left bg-cover bg-no-repeat brightness-90">
        <div className="h-full w-full backdrop-blur-sm ">
          <CentralizerContainer>
            <div>
              <h1 className="text-4xl color-background">
                Bem vindo ao MeuEstágioMed
              </h1>
              <h3 className="text-xl">
                Somos a ponte entre médicos dispostos a ensinar e alunos
                disponíveis para aprender.
              </h3>
            </div>
          </CentralizerContainer>
        </div>
      </div>

      <div className="pt-4 bg-[linear-gradient(175deg,_#ffffff_70%,_#7bc0f4_30%)]">
        <CentralizerContainer>
          <h2 className="text-2xl font-bold">Como funciona:</h2>
        </CentralizerContainer>
        <CentralizerContainer
          align="justify-evenly"
          outhers="flex-col md:flex-row gap-2 py-4 "
        >
          <Card className="border rounded-xl shadow-md bg-background p-4">
            <div className="flex-col ">
              <h3 className="text-xl">Para Médicos</h3>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">01.</span>{" "}
                  Cadastre-se
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">02.</span>{" "}
                  Seus dados serão conferidos pela nossa equipe interna
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">03.</span>{" "}
                  Crie o estágio disponível
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">04.</span>{" "}
                  Nossa Equipe fará uma validação da vaga
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">05.</span> A
                  vaga será disponibilizada para os estudantes disponíveis
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">06.</span>{" "}
                  Os estudantes se candidataram para o estágio
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">07.</span>{" "}
                  Você poderá selecionar seu estágiario
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">08.</span>{" "}
                  Agora é só esperar o estágio começar
                </h4>
              </div>
            </div>
          </Card>
          <Card className="border rounded-xl shadow-md bg-background p-4">
            <div className="flex-col ">
              <h3 className="text-xl">Para Estudantes</h3>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">01.</span>{" "}
                  Cadastre-se
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">02.</span>{" "}
                  Seus dados serão conferidos pela nossa equipe interna
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">03.</span>{" "}
                  Crie o estágio disponível
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">04.</span>{" "}
                  Nossa Equipe fará uma validação da vaga
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">05.</span> A
                  vaga será disponibilizada para os estudantes disponíveis
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">06.</span>{" "}
                  Os estudantes se candidataram para o estágio
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">07.</span>{" "}
                  Você poderá selecionar seu estágiario
                </h4>
              </div>
              <div className="pt-6 ml-2">
                <h4>
                  <span className="bg-primaryEdit p-2 rounded-full">08.</span>{" "}
                  Agora é só esperar o estágio começar
                </h4>
              </div>
            </div>
          </Card>
        </CentralizerContainer>
      </div>
      <div className="pt-4 bg-primaryEdit">
        <CentralizerContainer>
          <h2 className="text-2xl font-bold">Parceiros:</h2>
        </CentralizerContainer>
        <CentralizerContainer justify="justify-around" outhers="py-4">
          <div className="conteiner bg-background rounded-xl w-[150px] h-[130px] flex items-center justify-center">
            <Image
              src="/usp.png"
              height={100}
              width={140}
              alt="usp"
              className=""
            />
          </div>
          <div className="conteiner bg-background rounded-xl w-[150px] h-[130px] flex items-center justify-center">
            <Image
              src="/sca.jpg"
              height={100}
              width={140}
              alt="usp"
              className="rounded-xl"
            />
          </div>
        </CentralizerContainer>
      </div>

      <div className="pt-4 bg-[linear-gradient(175deg,_#7bc0f4_70%,_#ffffff_30%)]">
        <CentralizerContainer>
          <h2 className="text-2xl font-bold">Quem somos:</h2>
        </CentralizerContainer>
        <CentralizerContainer justify="justify-around" outhers="py-4">
          <Card className="conteiner bg-background border rounded-xl shadow-md p-4 ">
            <Image
              src={"/modelo.jpg"}
              alt={"fotopersonal"}
              width={180}
              height={180}
              className="rounded"
            ></Image>
            <h3 className="text-xl text-center">Nome</h3>
            <div className="flex justify-between gap-2">
              <Badge>ECONOMISTA</Badge>
              <Badge>INSPER</Badge>
            </div>
          </Card>
          <Card className="conteiner bg-background border rounded-xl shadow-md p-4">
            <Image
              src={"/modelo.jpg"}
              alt={"fotopersonal"}
              width={180}
              height={180}
              className="rounded"
            ></Image>
            <h3 className="text-xl text-center">Nome</h3>
            <div className="flex justify-between gap-2">
              <Badge>ECONOMISTA</Badge>
              <Badge>INSPER</Badge>
            </div>
          </Card>
          <Card className="conteiner bg-background border rounded-xl shadow-md p-4">
            <Image
              src={"/modelo.jpg"}
              alt={"fotopersonal"}
              width={180}
              height={180}
              className="rounded"
            ></Image>
            <h3 className="text-xl text-center">Nome</h3>
            <div className="flex justify-between gap-2">
              <Badge>ECONOMISTA</Badge>
              <Badge>INSPER</Badge>
            </div>
          </Card>
          <Card className="conteiner bg-background border rounded-xl shadow-md p-4">
            <Image
              src={"/modelo.jpg"}
              alt={"fotopersonal"}
              width={180}
              height={180}
              className="rounded"
            ></Image>
            <h3 className="text-xl text-center">Nome</h3>
            <div className="flex justify-between gap-2">
              <Badge>ECONOMISTA</Badge>
              <Badge>INSPER</Badge>
            </div>
          </Card>
        </CentralizerContainer>
      </div>
    </>
  );
}
