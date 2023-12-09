"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "@/utils/services";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { DeleteCookies } from "@/utils/teste";
import { MedicI, StudentI } from "@/utils/types/vagaI";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import axios from "axios";

interface providerProps {
  children: ReactNode;
}

interface credentialProps {
  email: string;
  password?: string;
  type?: string;
}

interface userProps extends MedicI, StudentI {
  scope: "medic" | "student";
}

interface contextProps {
  signIn(credentials: credentialProps): Promise<void>;
  route: any;
  loading: boolean;
  user: userProps | undefined;
  signOut: () => void;
}

const SigninContext = createContext({} as contextProps);

export function SigninProvider({ children }: providerProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userProps>();
  const route = useRouter();
  const pathname = usePathname();

  async function getMe() {
    await api
      .get("/me")
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((e) => {
        console.log("erro aq", e);
        //return signOut();
      });
    return;
  }

  useEffect(() => {
    const token = getCookie("mem.accessToken");

    if (token != undefined) {
        setTimeout(() => getMe(), 2000);
    }

  }, [pathname]);

  async function signIn({ email, password }: credentialProps) {
    setLoading(true);

    await api
      .post("/auth/signin", {
        email: email,
        password: password,
      })
      .then((resp) => {
        console.log(resp);
        const { AccessToken, RefreshToken, IdToken } = resp.data;

        setCookie("mem.accessToken", AccessToken);
        setCookie("mem.refreshToken", RefreshToken);
        setCookie("mem.idToken", IdToken);

        api.defaults.headers.common["Authorization"] = IdToken;
        api.defaults.headers.common["AccessToken"] = AccessToken;

        return setTimeout(() => route.replace("/app"), 3000);
      })
      .catch((e) => {
        setLoading(false)
        
        if(e.response?.status === 404){
          return toast({
            title: "Email ou senha incorreto!",
            description: "Revise-os e tente novamente!",
            icon: "alert",
          });
        } 
        return toast({
          title: "Erro!",
          description: "Algo deu errado, tente novamente mais tarde!",
          icon: "alert",
        });
      });
  }

  async function signOut() {
    const accessToken = getCookie("mem.accessToken");

    if (accessToken) {
      await DeleteCookies("mem.accessToken");
      await DeleteCookies("mem.refreshToken");
      await DeleteCookies("mem.idToken");

      await api
        .post("/auth/logout")
        .then((e) => redirect("/"))
        .catch((e) => console.log(e));
    }

    return;
  }

  return (
    <SigninContext.Provider
      value={{
        signIn,
        signOut,
        route,
        loading,
        user,
      }}
    >
      {children}
    </SigninContext.Provider>
  );
}

export function useSignin() {
  const context = useContext(SigninContext);

  return context;
}
