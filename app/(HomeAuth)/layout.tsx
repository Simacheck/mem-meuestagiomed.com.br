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
import { SigninProvider } from '@/hook/useSignin'
import { AuthMenuBar } from '@/components/memComponents/MenuBarAuth'
import { Toaster } from '@/components/ui/toaster'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Aplicativo | Seu Estágio Med",
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
          <div>
          <SigninProvider>
            
            <AuthMenuBar />
          
            {children}
            <Toaster />
          </SigninProvider>
          </div>
        </body>
      </html>
    
   
  );
}
