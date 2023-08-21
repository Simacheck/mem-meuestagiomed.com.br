import Link from "next/link";

export const LoginList = () => {
    return (
      <div className="flex flex-col md:flex-row justify-items-center items-center space-y-4 md:space-y-0  md:space-x-4 ">
        <Link href={"/"}>login</Link>
        <Link href={"/"} className="p-2 bg-red-500 rounded m-0">
          Cadastre-se
        </Link>
      </div>
    );
}