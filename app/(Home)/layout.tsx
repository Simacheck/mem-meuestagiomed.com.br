import { Menubar } from '@/components/ui/menubar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CentralizerContainer } from '@/components/memComponents/CentralizerContainer'
import Link from 'next/link'
import { MenuItensHome } from '@/utils/menuitens'
import Image from "next/image";
import { HamburguerMenu } from '@/components/memComponents/HomeNav/MenuHamburguer'
import { LoginList } from '@/components/memComponents/HomeNav/LoginList'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Início | MeuEstagioMed ',
  description: 'Generated by create next app',
}

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
    <body className={inter.className}>
        <Menubar>
          <CentralizerContainer>
            <div>
              <Image src='/logo-simples-azul.png' alt='logo' height={50} width={120} />
            </div>
            <div className="hidden md:flex space-x-4 ">
              {MenuItensHome.map((item) => (
                <Link
                key={item.route}
                href={item.route}
                  className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                >
                  {item.item}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex">
              <LoginList />
            </div>
            <HamburguerMenu />
          </CentralizerContainer>
        </Menubar>
        {children}
      </body>
    </html>
     
  );
}
