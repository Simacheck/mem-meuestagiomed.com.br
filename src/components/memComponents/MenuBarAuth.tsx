'use client'

import { useSignin } from "@/hook/useSignin";
import { Menubar } from "../ui/menubar"
import { CentralizerContainer } from "./CentralizerContainer"
import Image from "next/image";
import { ManuItensAppEstudante, ManuItensAppMedico } from "@/utils/menuitens";
import Link from "next/link";
import { UserNav } from "./HomeNav/UserNav";

export const AuthMenuBar = () => {
    const { user } = useSignin()
    
    return(
        <Menubar>
            <CentralizerContainer>
              <>
                <Image src="/logo-simples-azul.png" alt="logo" height={50} width={120} />
              </>
              <div className="flex  items-center space-x-4">
                <div className="hidden md:flex space-x-4">
   
                  {user?.userType === 'medico' ?
                    (ManuItensAppMedico.map((item) => (
                      <Link
                        key={item.route}
                        href={item.route}
                        className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                      >
                        {item.item}
                      </Link>)))
                  : (ManuItensAppEstudante.map((item) => (
                    <Link
                      key={item.route}
                      href={item.route}
                      className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                    >
                      {item.item}
                    </Link>)
                  ))}
                </div>
                <UserNav />
              </div>
            </CentralizerContainer>
          </Menubar>
    )
}