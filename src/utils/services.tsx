'use client'

import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { signOut } from "./functions";

let isRefreshing = false;
let failedRequestQueue: {
  onSucess: ({ AccessToken, IdToken }: onSucessProps) => void;
  onFail: (err: AxiosError<unknown, any>) => void;
}[] = [];

interface onSucessProps {
  AccessToken: string;
  IdToken: string;
}

const cookieExists = getCookie("mem.idToken");

export const api = axios.create({
  // baseURL: 'http://localhost:3002/',
  baseURL: "https://dev.meuestagiomed.com.br/",
  headers: cookieExists
    ? {
        Authorization: `${getCookie("mem.idToken")}`,
        AccessToken: `${getCookie("mem.accessToken")}`,
        RefreshToken: `${getCookie("mem.refreshToken")}`,
      }
    : {},
});







api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("REFRESH TOKEN ATIVADO", error);

    if (error.response?.status == 401) {
      let mensage = error.response.data.message;
      
      if (
        mensage === "Access Token Expired" ||
        mensage === "The incoming token has expired"
      ) {
        console.log("acess token expirado ou incomining token");

        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          await api
            .post("/auth/refresh")
            .then((response) => {
              const { AccessToken, IdToken } = response.data;

              console.log("refresh deu certo");
              

              setCookie("mem.accessToken", AccessToken, {
                maxAge: 60 * 60 * 24 * 30, // 30days
                path: "/",
              });

              setCookie("mem.idToken", IdToken, {
                maxAge: 60 * 60 * 24 * 30, // 30days
                path: "/",
              });

              
              api.defaults.headers.common["Authorization"] = IdToken.toString();
              api.defaults.headers.common["AccessToken"] = AccessToken.toString();
              
              console.log('api é essa', IdToken , api.defaults.headers)
              
              let data = { IdToken, AccessToken };

              setTimeout(() => failedRequestQueue.forEach((request) => request.onSucess(data)), 1000)
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFail(err));
              failedRequestQueue = [];

              if (process.browser) {
                signOut();
              }
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSucess: ({ AccessToken, IdToken }: onSucessProps) => {
              originalConfig.headers["Authorization"] = IdToken;
              originalConfig.headers["AccessToken"] = AccessToken;

              resolve(api(originalConfig));
            },
            onFail: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else if (mensage !== "The password is incorrect") {

        signOut();
      }
    }

    return Promise.reject(error);
  }
);
