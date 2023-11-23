import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CurriculoForm } from "@/components/memComponents/Forms/CurriculoForm";

export default function Signin() {
  return (
    <CentralizerContainer outhers={"pt-[5.5rem] "}>
      <div className="w-full">
        <div className="py-2">
          <h2 className="text-3xl">Currículo:</h2>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <InfoTextHover title={"Perfil"} description={"abc"} />
          <div className="p-2 flex flex-col md:flex-row w-full flax-wrap items-center">
            <Avatar className="h-[15rem] w-[15rem]">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-wrap w-full justify-between">
              <div className="flex flex-col w-full md:w-[35%] justify-between">
                <div className="px-4 py-2">
                  <div>
                    <div> 
                      <p>Nome:</p>
                    </div>
                    <h3 className="text-3xl">Eduardo Santos</h3>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Email:</p>
                    </div>
                    <h3 className="text-xl">abc@gmail.com</h3>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-4 py-2">
                    <div>
                      <div>
                        <p>CPF:</p>
                      </div>
                      <h3 className="text-lg">***.***.789-18</h3>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <div>
                      <div>
                        <p>Data Nascimento:</p>
                      </div>
                      <h3 className="text-lg">abc@gmail.com</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-[35%]  justify-between">
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Faculdade:</p>
                    </div>
                    <h3 className="text-3xl">Cesumar</h3>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Período:</p>
                    </div>
                    <h3 className="text-lg">5º</h3>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Campus:</p>
                    </div>
                    <h3 className="text-lg">Londrina - PR</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-dull md:w-[30%] items-center justify-center">
                <Button variant={"outline"} className="w-full">
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <InfoTextHover title={"Currículo"} description={"abc"} />
          <div>
            <CurriculoForm />
          </div>
        </div>
      </div>
    </CentralizerContainer>
  );
}
