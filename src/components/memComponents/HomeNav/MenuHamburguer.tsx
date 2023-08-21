import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../../ui/sheet"
import { MenuItensHome } from "@/utils/menuitens";
import Link from "next/link";
import { LoginList } from "./LoginList";

export const HamburguerMenu = () => {
    return (
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader className="flex space-y-4 h-screen items-center ">
              {MenuItensHome.map((item) => (
                <Link key={item.route} href={item.route}>
                  {item.item}
                </Link>
              ))}
              <LoginList />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    );
}