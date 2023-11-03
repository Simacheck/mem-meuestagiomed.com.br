import { Menubar } from '@/components/ui/menubar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CentralizerContainer } from '@/components/memComponents/CentralizerContainer'
import Link from 'next/link'
import { ManuItensAppEstudante, ManuItensAppMedico, MenuItensHome } from '@/utils/menuitens'
import { HamburguerMenu } from '@/components/memComponents/HomeNav/MenuHamburguer'
import { LoginList } from '@/components/memComponents/HomeNav/LoginList'
import Image from "next/image";
import { UserNav } from '@/components/memComponents/HomeNav/UserNav'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: "Seu Estágio Med",
  icons: '../favicon.ico'
};

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userType = 'medico'
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Menubar>
          <CentralizerContainer>
            <div>
              <Image src="/loggo.png" alt="logo" height={50} width={120} />
            </div>
            <div className="flex  items-center space-x-4">
              <div className="hidden md:flex space-x-4">
                {userType === 'medico' ?
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
        {children}
      </body>
    </html>
  );
}
