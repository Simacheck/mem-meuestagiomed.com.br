import { CentralizerContainer } from "./CentralizerContainer"


export const Footer = () => {
    return (
      <div className="bg-primaryEdit text-xs mt-4 p-2">
        <CentralizerContainer>
          <div className="flex flex-col" >
            <text>
              Copyright ® 2023 - MEM EDUCACAO E TREINAMENTO PROFISSIONALIZANTE
              LTDA - CNPJ: 12.216.595/0001-04
            </text>
          </div>
          <div>
            <text>Todos os direitos reservados.</text>
          </div>
        </CentralizerContainer>
      </div>
    );
}