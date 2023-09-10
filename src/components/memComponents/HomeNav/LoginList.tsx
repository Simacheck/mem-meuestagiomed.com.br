import Link from "next/link";

export const LoginList = () => {
    return (
      <div className="flex flex-col md:flex-row justify-items-center items-center space-y-4 md:space-y-0  md:space-x-4 ">
        <Link href={"/signin"}>login</Link>
        <Link
          href={"/signup"}
          className="p-2 bg-primary transition duration-500 ease-in-out hover:bg-primary/80 font-semibold rounded m-0 text-white"
        >
          Cadastre-se
        </Link>
      </div>
    );
}