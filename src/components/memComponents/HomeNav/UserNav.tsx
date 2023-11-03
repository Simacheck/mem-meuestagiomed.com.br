'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ManuItensAppEstudante, ManuItensAppMedico } from "@/utils/menuitens";


export function UserNav() {
  const userType = 'student'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Perfil</DropdownMenuItem>
          {userType == 'medico' ?
            (ManuItensAppMedico.map((item) => (
              <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-200"
              key={item.item}>
                {item.item}
              </DropdownMenuItem>)))
            : (ManuItensAppEstudante.map((item) => (
            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-200"
              key={item.item}>
                {item.item}
              </DropdownMenuItem>)))
          }
        </DropdownMenuGroup>
        <Separator />
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
