import { Menubar } from '@/components/ui/menubar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CentralizerContainer } from '@/components/memComponents/CentralizerContainer'
import Link from 'next/link'
import { MenuItensHome } from '@/utils/menuitens'
import { Menu } from 'lucide-react'
import { HamburguerMenu } from '@/components/memComponents/HomeNav/MenuHamburguer'
import { LoginList } from '@/components/memComponents/HomeNav/LoginList'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}