'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "@/utils/services";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { DeleteCookies } from "@/utils/teste";

interface providerProps {
    children: ReactNode
}

interface credentialProps {
    email: string;
    password?: string;
    type?: string
}

export interface userProps {
    name: string,
    email: string,
    userType: string,
    AcessToken: string,
    RefreshToken: string,
    IdToken: string
}

interface contextProps {
    signIn(credentials: credentialProps): Promise<void>;
    route: any;
    loading: boolean;
    isAthenticated: boolean;
    user: userProps | undefined;
    signOut: () => void;
}

const SigninContext = createContext({} as contextProps);

export function SigninProvider({ children }: providerProps) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userProps>();
    const isAthenticated = !!user;
    const route = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = getCookie('mem.accessToken');

        if (token != undefined) {
            api.get("/user/me")
                .then((resp) => {
                    console.log(resp.data);
                    const {
                        name,
                        email,
                        userType,
                        AcessToken,
                        RefreshToken,
                        IdToken
                    } = resp.data;

                    setUser({
                        name,
                        email,
                        userType,
                        AcessToken,
                        RefreshToken,
                        IdToken
                    });
                })
                .catch(() => {
                    signOut();
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    async function signIn({ email, password }: credentialProps) {
        setLoading(true);

        await api
            .post("/login", {
                email: email,
                password: password,
            })
            .then((resp) => {

                console.log(resp)
                const { AccessToken, IdToken, RefreshToken } = resp.data;

                setCookie('mem.idToken', IdToken)
                setCookie('mem.accessToken', AccessToken)
                setCookie('mem.refreshToken', RefreshToken)

                api.defaults.headers.common["Authorization"] = IdToken;
                api.defaults.headers.common["AccessToken"] = AccessToken;

                return route.replace('/app')
            })
            .catch(() => {

                return console.log('error')
            });
        setLoading(false);
    }

    async function signOut() {
        const refreshToken = getCookie('mem.refreshToken');
        console.log('ta entrando no signout', refreshToken)
    
        if(refreshToken){

            await DeleteCookies('mem.idToken')
            await DeleteCookies('mem.accessToken')
            await DeleteCookies('mem.refreshToken')


            await api
                .post("/auth/logout", {
                    RefreshToken: refreshToken,
                })
                
            
            console.log('passou da info')
            return route.replace('/')
        }

        return
    }

    return (
        <SigninContext.Provider
            value={{
                signIn,
                signOut,
                route,
                loading,
                isAthenticated,
                user,
            }}
        >
            {children}
        </SigninContext.Provider>
    );
}

export function useSignin() {
    const context = useContext(SigninContext);

    return context
}

