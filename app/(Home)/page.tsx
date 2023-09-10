import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ProfileForm } from "./Form";
import { Footer } from "@/components/memComponents/footer";
import { StartAnimation } from "@/components/memComponents/ScrollAnimation";
import { useMemo } from "react";
import getScrollAnimation from "@/utils/getScrollAnimation";

export default function Home() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  
  return (
    <>
      <StartAnimation>
        <div className="h-100 min-h-[400px]  pt-32">
          <div className="h-full w-full">
            <div className=" max-w-screen-xl flex m-auto w-full h-full items-center flex-wrap">
              <div className="w-50 max-w-[600px]">
                <h1 className="text-4xl w-3/4 py-4">
                  Bem vindo ao <strong>MeuEstágioMed</strong>
                </h1>
                <h3 className="text-xl w-3/4">
                  Somos a ponte entre médicos dispostos a ensinar e alunos
                  disponíveis para aprender.
                </h3>
              </div>

              <Image src={"/doctors.svg"} alt={""} height={500} width={500} />
            </div>
          </div>
        </div>
      </StartAnimation>

      <StartAnimation>
        <div className="pt-4 px-2 bg-[linear-gradient(175deg,_#ffffff_70%,_#7bc0f4_30%)]">
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
                    <span className="bg-primaryEdit p-2 rounded-full">05.</span>{" "}
                    A vaga será disponibilizada para os estudantes disponíveis
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
                    <span className="bg-primaryEdit p-2 rounded-full">05.</span>{" "}
                    A vaga será disponibilizada para os estudantes disponíveis
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
      </StartAnimation>

      <StartAnimation>
        <div className="pt-4 px-2 bg-primaryEdit">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold text-white">Parceiros:</h2>
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
      </StartAnimation>

      <StartAnimation>
        <div className="pt-4 px-2 bg-[linear-gradient(175deg,_#7bc0f4_70%,_#ffffff_30%)]">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold text-white">Quem somos:</h2>
          </CentralizerContainer>
          <CentralizerContainer
            justify="justify-around"
            outhers="py-4 flex-wrap gap-2"
          >
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
      </StartAnimation>

      <StartAnimation>
        <div className="pt-4 px-2">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold">Fale Conosco:</h2>
          </CentralizerContainer>
          <CentralizerContainer outhers="w-full md:w-[40rem]">
            <ProfileForm />
          </CentralizerContainer>
        </div>
      </StartAnimation>
      
      <Footer />
    </>
  );
}
